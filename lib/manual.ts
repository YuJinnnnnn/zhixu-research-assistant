export type Chapter={
  id:string;
  group:string;
  title:string;
  intro:string;
  sections:{title:string;text?:string;steps?:string[];columns?:string[];rows?:string[][];note?:string}[]
};

export const chapters:Chapter[]=[
  {id:'start',group:'快速开始',title:'认识知序',intro:'知序是面向研究团队的会议信息整理工具。它将会议记录、成员贡献分析和研究报告生成集中在同一个项目空间中。',sections:[
    {title:'当前 Demo 包含什么',columns:['页面','主要用途'],rows:[['Overview','快速查看项目中的会议、参与成员和报告入口'],['Meetings','阅读每场会议的总结与完整转录'],['Memory','查看成员发言量、语义重叠和关键证据来源'],['AI Assistant','选择会议并生成可下载的研究进展报告']]},
    {title:'建议体验顺序',steps:['先从 Overview 了解项目目前包含的内容。','进入 Meetings，比较三次会议的总结与转录。','进入 Memory，观察不同成员对讨论的贡献与语义关联。','进入 AI Assistant，选择会议并生成研究进展报告。']},
    {title:'项目场景',text:'Demo 使用 IBS · 2D Materials 作为虚构研究项目，包含三次会议和六位成员。项目中的人物、日期、发言与研究数据均为演示内容。',note:'当前版本使用本机存储，不接入真实录音、身份认证、云端同步或真实 AI 模型。'}
  ]},
  {id:'overview',group:'功能介绍',title:'Overview',intro:'Overview 是项目的起点，用于快速了解已有内容并进入不同工作页面。',sections:[
    {title:'三个功能入口',columns:['入口','显示内容','点击后'],rows:[['Meetings','项目中的会议数量','进入会议记录页面'],['Contributors','参与讨论的成员数量','进入 Memory 语义贡献图'],['Report','当前可生成的报告类型','进入报告生成页面']]},
    {title:'Recent meetings',text:'按日期列出项目中的三次会议。点击任意一场会议，会直接进入对应的会议记录。'},
    {title:'Next steps',text:'集中显示最近一次会议形成的后续安排，帮助成员在进入详细记录前快速了解接下来的工作。'}
  ]},
  {id:'meetings',group:'功能介绍',title:'Meetings',intro:'Meetings 保存每次讨论的内容。用户可以在三场会议之间切换，并分别查看总结或完整转录。',sections:[
    {title:'选择会议',text:'页面顶部按日期展示 Project planning、First round 和 Progress 三场会议。选择后，标题、会议形式、成员数量、时长与正文会同步更新。'},
    {title:'Summary',text:'Summary 按发言者整理会议中的主要内容，适合快速阅读。每位成员都显示姓名、工作头衔和从转录中提取的摘要。'},
    {title:'Transcript',text:'Transcript 展示按时间排列的完整发言。每条记录保留发言者、工作头衔和时间信息，便于回到原始讨论语境。'},
    {title:'如何使用',steps:['先选择需要查看的会议。','使用 Summary 快速了解会议内容。','需要核对具体表达时切换到 Transcript。','若要比较成员贡献，可继续前往 Memory。']}
  ]},
  {id:'memory',group:'功能介绍',title:'Memory',intro:'Memory 将会议转录转换为成员贡献的可视化，帮助用户理解谁主导了讨论、哪些观点发生重叠，以及关键证据由谁提出。',sections:[
    {title:'选择分析范围',text:'可以查看全部会议，也可以单独选择 Planning、First round 或 Progress。不同范围会显示不同的语义图、发言量和关键证据。'},
    {title:'Semantic overlap',text:'每个彩色区域代表一位成员。区域大小反映其发言字符量，区域之间的重叠表示讨论内容的语义关联。该图用于展示相对关系，不代表统计显著性。'},
    {title:'Contributors',text:'右栏按成员列出姓名、工作头衔、发言字符数和占比。若某位成员提出了关键数据，其卡片中会同时显示对应证据。'},
    {title:'查看单人贡献',steps:['点击语义图中的成员区域，或点击右侧成员卡片。','被选中的成员保持清晰，其他成员降低透明度。','再次点击当前成员即可恢复全部成员视图。'],note:'字符数、占比和语义重叠均基于 Demo 中预先准备的虚构转录。'}
  ]},
  {id:'assistant',group:'功能介绍',title:'AI Assistant',intro:'AI Assistant 当前专注于一个任务：根据用户选择的会议生成研究进展报告。',sections:[
    {title:'选择报告范围',text:'初始状态不选择任何会议。用户可以选择一场、多场或 All meetings。至少选择一场会议后，Generate report 按钮才可使用。'},
    {title:'生成报告',steps:['选择需要纳入报告的会议。','点击 Generate report。','页面下方显示生成后的研究进展报告。','如需调整内容范围，修改会议选择并重新生成。']},
    {title:'下载报告',text:'报告生成后会出现 Download 按钮。下载文件为 Markdown 格式，可继续编辑、归档或复制到其他文档中。'},
    {title:'内容边界',text:'报告只使用当前选择的会议内容。未被选中的会议不会纳入本次生成结果。当前输出由固定规则生成，用于演示交互流程。'}
  ]},
  {id:'demo',group:'使用说明',title:'Demo 信息',intro:'这一版本用于展示知序的产品结构和交互方式，不用于处理真实研究资料。',sections:[
    {title:'数据与身份',columns:['项目','当前状态'],rows:[['人物与研究数据','全部为虚构内容'],['会议录音','未接入，仅提供预置转录'],['用户切换','演示不同成员视角，不代表真实身份认证'],['数据保存','保存在当前浏览器的本机存储中'],['跨设备同步','未接入'],['报告生成','固定规则演示，不调用真实模型']]},
    {title:'语言切换',text:'中文与英文模式使用同一套项目结构。切换语言只改变界面和预置内容的展示语言，不会创建另一份项目数据。'},
    {title:'清除浏览器数据',text:'本机存储会在刷新后保留部分演示状态。清除当前站点的浏览器数据后，这些本机状态会被移除。'}
  ]}
];
