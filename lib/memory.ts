import type { TranscriptVersion, MeetingSummary } from './transcripts.ts';
export type Status = 'pending' | 'confirmed' | 'rejected' | 'forgotten';
export type MemoryId =
  | 'goal'
  | 'data'
  | 'decision'
  | 'screening'
  | 'hypothesis'
  | 'tasks'
  | 'private'
  | 'other';
export type Memory = {
  id: MemoryId;
  title: string;
  text: string;
  status: Status;
  owner: string;
  scope: 'team' | 'private';
  project: string;
  source: string;
  meeting: number;
  speaker: number;
  version: number;
  value?: number;
  sourceReviewRequired?: boolean;
};
export type CallItem = {
  id: MemoryId;
  title: string;
  reason: string;
  source: string;
  meeting: number;
  speaker: number;
};
export type Answer = {
  text: string;
  used: CallItem[];
  skipped: CallItem[];
  revision: number;
};
export type Session = {
  id: string;
  actor: string;
  question: string;
  answer: Answer | null;
};
export type State = {
  transcriptVersions?: Record<string, TranscriptVersion[]>;
  meetingSummaries?: Record<string, MeetingSummary>;
  schema: 3;
  revision: number;
  memories: Memory[];
  extracted: boolean;
  sourceText: string;
  sourceAuthor: string;
  sourceHistory: { text: string; author: string }[];
  sourceDirty: boolean;
  audit: string[];
  sessions: Session[];
};
export const originalSource =
  '我要纠正上次报告的 B 组中位数：610 来自旧版汇总表，复核后应为 690 Ω·μm，有效样本仍是 5 个。A 组仍为 820，有效样本 6 个，以复核表 v2 为准。';
export function initialState(): State {
  return {
    schema: 3,
    revision: 1,
    extracted: false,
    sourceText: originalSource,
    sourceAuthor: 'Choi（原始发言）',
    sourceHistory: [],
    sourceDirty: false,
    audit: [],
    sessions: [],
    memories: [
      {
        id: 'goal',
        title: '接触电阻降低目标',
        text: '月初目标：相对 A 对照组降低至少 20%。这是目标，不是实验结果。',
        status: 'confirmed',
        owner: 'Park',
        scope: 'team',
        project: 'M09',
        source: '09.02 · Park · 02:10（预置已确认）',
        meeting: 0,
        speaker: 0,
        version: 1,
      },
      {
        id: 'data',
        title: 'B 组接触电阻',
        text: 'B 组中位数 690 Ω·μm，n=5；A 组 820 Ω·μm，n=6。替代旧版 610。',
        value: 690,
        status: 'pending',
        owner: 'Choi',
        scope: 'team',
        project: 'M09',
        source: '09.23 · Choi · 18:42',
        meeting: 2,
        speaker: 3,
        version: 2,
      },
      {
        id: 'decision',
        title: '阶段良率门槛',
        text: '两组初筛通过率均至少 75%，从 9 月 23 日开始适用。',
        status: 'pending',
        owner: 'Park',
        scope: 'team',
        project: 'M09',
        source: '09.23 · Park · 02:10',
        meeting: 2,
        speaker: 0,
        version: 1,
      },
      {
        id: 'screening',
        title: '器件初筛结果',
        text: 'Lee 报告 A 组初筛通过 10/12，B 组 8/12。此处不是接触电阻提取样本数。',
        status: 'confirmed',
        owner: 'Lee',
        scope: 'team',
        project: 'M09',
        source: '09.23 · Lee · 12:06（预置核查为会议陈述）',
        meeting: 2,
        speaker: 2,
        version: 1,
      },
      {
        id: 'hypothesis',
        title: '界面机制假设',
        text: '接触处理可能改变界面状态，尚未证明因果关系。',
        status: 'confirmed',
        owner: 'Wang',
        scope: 'team',
        project: 'M09',
        source: '09.02 · Wang · 24:15（预置保留为假设）',
        meeting: 0,
        speaker: 4,
        version: 1,
      },
      {
        id: 'tasks',
        title: '待完成的研究工作',
        text: 'Han 修订月报并补齐器件排除原因；Choi 补充测试条件；Lee 确认清洗对照安排。没有证据表明任务已完成。',
        status: 'confirmed',
        owner: 'Han',
        scope: 'team',
        project: 'M09',
        source: '09.23 · Han · 29:30（预置行动项）',
        meeting: 2,
        speaker: 5,
        version: 1,
      },
      {
        id: 'private',
        title: 'Wang 的个人研究笔记',
        text: 'Wang 的假设：清洗步骤可能影响结果，仍需实验验证。',
        status: 'confirmed',
        owner: 'Wang',
        scope: 'private',
        project: 'M09',
        source: 'Wang · 个人笔记（虚构示例）',
        meeting: -1,
        speaker: 4,
        version: 1,
      },
      {
        id: 'other',
        title: '另一个项目的初步记录',
        text: 'P08 项目曾观察到约 30% 的变化，材料与统计口径不同。',
        status: 'confirmed',
        owner: 'Kim',
        scope: 'team',
        project: 'P08',
        source: 'P08 · 另一项目（虚构示例）',
        meeting: -1,
        speaker: 1,
        version: 1,
      },
    ],
  };
}
function change(s: State, description: string): State {
  return {
    ...s,
    revision: s.revision + 1,
    audit: [description, ...s.audit].slice(0, 50),
  };
}
export function act(
  s: State,
  id: MemoryId,
  action: 'confirm' | 'reject' | 'forget' | 'reconsider' | 'share' | 'unshare',
  actor: string,
): State {
  const m = s.memories.find((x) => x.id === id);
  if (!m) throw new Error('记忆不存在');
  if (
    (action === 'share' || action === 'unshare') &&
    (m.id !== 'private' || actor !== m.owner)
  )
    throw new Error('仅笔记作者能更改共享范围');
  if (m.scope === 'private' && actor !== m.owner)
    throw new Error('无权访问个人记忆');
  if (action === 'forget' && m.owner !== actor)
    throw new Error(`团队记忆由 ${m.owner} 撤回；你可以在回答中选择本次不用`);
  if (['confirm', 'reconsider'].includes(action) && m.owner !== actor)
    throw new Error(`请切换到 ${m.owner} 的演示视角`);
  if (action === 'confirm' && m.sourceReviewRequired)
    throw new Error('来源已修改，需重新核查并结构化提取，不能确认旧记忆。');
  if (
    action === 'confirm' &&
    id === 'data' &&
    (!s.extracted || s.sourceDirty || !m.value)
  )
    throw new Error('先重新提取并核查数值、单位与口径');
  if (action === 'confirm' && m.status !== 'pending')
    throw new Error('只能确认待核查候选');
  if (action === 'reject' && m.status !== 'pending')
    throw new Error('只能拒绝候选');
  if (action === 'reconsider' && m.status !== 'rejected')
    throw new Error('仅被拒绝的候选可重新核查');
  if (m.status === 'forgotten')
    throw new Error('已忘记的记忆不能直接恢复，请从来源重新提取');
  const next = { ...m, version: m.version + 1 };
  if (action === 'confirm') next.status = 'confirmed';
  if (action === 'reject') next.status = 'rejected';
  if (action === 'forget') {
    next.status = 'forgotten';
    next.text = '';
    delete next.value;
  }
  if (action === 'reconsider') next.status = 'pending';
  if (action === 'share') next.scope = 'team';
  if (action === 'unshare') next.scope = 'private';
  return change(
    { ...s, memories: s.memories.map((x) => (x.id === id ? next : x)) },
    `${actor} · ${action === 'confirm' ? '确认' : action === 'reject' ? '不保存' : action === 'forget' ? '忘记' : action === 'reconsider' ? '重新核查' : action === 'share' ? '共享为个人假设' : '撤回共享'} · ${m.title}`,
  );
}
export function editSource(s: State, text: string, actor: string): State {
  if (!text.trim()) throw new Error('转录不能为空');
  const at = new Date().toISOString();
  const history = s.transcriptVersions?.['2:3'] ?? [];
  return change(
    {
      ...s,
      transcriptVersions: {
        ...s.transcriptVersions,
        '2:3': [
          ...history,
          { version: history.length + 1, text: text.trim(), author: actor, at },
        ],
      },
      sourceText: text.trim(),
      sourceAuthor: actor,
      sourceHistory: [
        { text: s.sourceText, author: s.sourceAuthor },
        ...s.sourceHistory,
      ].slice(0, 10),
      sourceDirty: true,
      extracted: false,
      memories: s.memories.map((m) =>
        m.id === 'data'
          ? {
              ...m,
              status: 'pending',
              text: '来源已修改，等待重新提取',
              value: undefined,
              version: m.version + 1,
            }
          : m,
      ),
    },
    `${actor} · 修正转录；旧数据及派生摘要停止当前调用`,
  );
}
export function extract(s: State, actor: string): State {
  // Conservative, explicit demo grammar. Arbitrary prose is not interpreted as evidence.
  const matches = [
    ...s.sourceText.matchAll(
      /(?:复核后应为|The reviewed value is)\s*(\d+(?:\.\d+)?)\s*Ω·μm/gi,
    ),
  ];
  const chineseScope =
    /有效样本仍是\s*5\s*个/.test(s.sourceText) &&
    /A\s*组仍为\s*820/.test(s.sourceText) &&
    /有效样本\s*6\s*个/.test(s.sourceText);
  const englishScope =
    /The reviewed value is\s*\d+(?:\.\d+)?\s*Ω·μm, with 5 valid samples\. A remains 820, with 6 valid samples\./i.test(
      s.sourceText,
    );
  if (matches.length !== 1 || !(chineseScope || englishScope))
    throw new Error(
      '无法可靠提取。示例支持“复核后应为 数值 Ω·μm”，并保留 B 组样本 5、A 组 820 与样本 6；其他口径需人工分析。',
    );
  const value = Number(matches[0][1]);
  if (!Number.isFinite(value) || value <= 0 || value > 100000)
    throw new Error('请检查数值范围');
  return change(
    {
      ...s,
      sourceDirty: false,
      extracted: false,
      memories: s.memories.map((m) =>
        m.id === 'data'
          ? {
              ...m,
              value,
              text: `B 组中位数 ${value} Ω·μm，n=5；A 组 820 Ω·μm，n=6。`,
              status: 'pending',
              version: m.version + 1,
            }
          : m,
      ),
    },
    `${actor} · 重新提取数值；等待提取核查与 Choi 确认`,
  );
}
export function checkExtraction(s: State, actor: string): State {
  if (s.sourceDirty || !s.memories.find((m) => m.id === 'data')?.value)
    throw new Error('先完成重新提取');
  return change(
    { ...s, extracted: true },
    `${actor} · 确认提取符合当前原文；数据仍待负责人确认`,
  );
}
export function recall(
  s: State,
  actor: string,
  question: string,
  ignore: MemoryId[] = [],
): Answer {
  const relevant =
    /汇报|报告|进展|月报|准备|下一|会议|实验|数据|目标|材料|研究|\b(report|reports|progress|monthly|prepare|preparation|meeting|meetings|experiment|experiments|data|target|targets|material|materials|research|resistance|screening|M09)\b/i.test(
      question,
    );
  const used: CallItem[] = [],
    skipped: CallItem[] = [];
  for (const m of s.memories) {
    if (m.scope === 'private' && m.owner !== actor) continue; // Do not reveal private metadata.
    const item = {
      id: m.id,
      title: m.title,
      source: m.source,
      meeting: m.meeting,
      speaker: m.speaker,
      reason: '',
    };
    let reason = '';
    if (m.project !== 'M09') reason = '项目不同，材料与口径不一致';
    else if (m.status === 'forgotten') reason = '已忘记，不检索正文';
    else if (m.status === 'rejected') reason = '用户选择不保存';
    else if (m.status !== 'confirmed') reason = '尚未确认或来源有变更';
    else if (ignore.includes(m.id)) reason = '你选择本次不用';
    else if (!relevant) reason = '与本次任务不相关';
    if (reason) skipped.push({ ...item, reason });
    else
      used.push({
        ...item,
        reason:
          m.id === 'private'
            ? '作者的个人假设，不能当团队结论'
            : `同项目、当前有效；${m.id === 'hypothesis' ? '仅以假设语气使用' : '支持本次研究任务'}`,
      });
  }
  const has = (id: MemoryId) => used.some((x) => x.id === id);
  const value = s.memories.find((m) => m.id === 'data')?.value;
  const lines: string[] = [];
  if (!relevant)
    lines.push(
      '当前演示只支持研究汇报、项目进展和会议准备。这个问题与 M09 记忆无关，因此没有调用项目记录。',
    );
  else {
    if (has('goal'))
      lines.push(
        '本月目标是接触电阻相对对照组降低至少 20%，目标不等于实际结果。',
      );
    if (has('data') && value) {
      const percent = ((820 - value) / 820) * 100;
      lines.push(
        `经负责人确认，A 组中位接触电阻为 820 Ω·μm（n=6），B 组为 ${value} Ω·μm（n=5）。相对${percent >= 0 ? '降低' : '升高'} ${Math.abs(percent).toFixed(1)}%。${has('goal') ? (percent >= 20 ? '数值上达到 20% 目标，但仍须检验实验可靠性。' : '未达到 20% 目标。') : '本次未调用目标，不判断目标是否达成。'}`,
      );
    } else
      lines.push(
        '本次没有可用的已确认电阻数据，不引用旧数字，也不判断电阻目标是否达成。',
      );
    if (has('decision'))
      lines.push('9 月 23 日起，阶段门槛为两组初筛通过率均至少 75%。');
    if (has('screening'))
      lines.push(
        `据 Lee 的会议陈述，A 组初筛通过 10/12（83.3%），B 组 8/12（66.7%）。${has('decision') ? 'B 组未达到阶段门槛。' : '本次未调用有效门槛，不判断是否达标。'}初筛数量不等于接触电阻提取样本数。`,
      );
    if (has('hypothesis'))
      lines.push('界面状态变化仍是待验证假设，不能写成已证明的因果关系。');
    if (has('tasks'))
      lines.push(
        '下一步：Han 修订月报和器件排除原因；Choi 补齐测试条件；Lee 确认清洗对照安排。任务尚无完成证据。',
      );
    if (has('private'))
      lines.push(
        '补充观点：Wang 的个人假设是清洗步骤可能影响结果。即使共享，也不代表团队共识。',
      );
    lines.push(
      '上述内容来自会议或笔记记录；未接入原始实验文件，不能据此推断统计显著性。',
    );
  }
  return { text: lines.join('\n\n'), used, skipped, revision: s.revision };
}
export function restore(raw: string): State {
  const s = JSON.parse(raw) as State;
  if (
    s.schema !== 3 ||
    !Number.isInteger(s.revision) ||
    !Array.isArray(s.memories) ||
    s.memories.length !== 8 ||
    new Set(s.memories.map((m) => m.id)).size !== 8 ||
    !initialState().memories.every((m) =>
      s.memories.some((x) => x.id === m.id),
    ) ||
    s.memories.some(
      (m) =>
        !['pending', 'confirmed', 'rejected', 'forgotten'].includes(m.status) ||
        typeof m.text !== 'string' ||
        typeof m.title !== 'string' ||
        !['team', 'private'].includes(m.scope) ||
        (m.value !== undefined && (!Number.isFinite(m.value) || m.value <= 0)),
    ) ||
    typeof s.sourceText !== 'string' ||
    typeof s.sourceAuthor !== 'string' ||
    typeof s.extracted !== 'boolean' ||
    typeof s.sourceDirty !== 'boolean' ||
    !Array.isArray(s.audit) ||
    !Array.isArray(s.sessions) ||
    !Array.isArray(s.sourceHistory)
  )
    throw new Error('本机存档格式不兼容');
  return s;
}
