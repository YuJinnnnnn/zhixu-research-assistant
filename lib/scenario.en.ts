export const peopleEn=[
{name:'Park',role:'Professor · Project lead',job:'Direction, milestones and decisions'},
{name:'Kim',role:'Researcher · Materials',job:'Material preparation and batches'},
{name:'Lee',role:'Researcher · Devices',job:'Device fabrication and processing'},
{name:'Choi',role:'Postdoc · Electrical characterization',job:'Testing and data review'},
{name:'Wang',role:'Postdoc · Mechanisms',job:'Evidence analysis and research hypotheses'},
{name:'Han',role:'PhD student · Experiments',job:'Experiment logs and meeting notes'},
];
export const meetingsEn=[
{title:'Project planning',date:'09.02',mode:'In person',duration:'32 min',purpose:'Define the research question, experimental groups and monthly target.',speeches:[
'This month, we will ask whether contact treatment can consistently reduce contact resistance. Our provisional target is a 20% reduction relative to the control, without a substantial decline in device yield. Today we are setting a target, not reporting an achieved result.',
'I will supply one batch of 2D semiconductor material, labeled M09. We should use the same batch in the first round to limit material variation when comparing processes.',
'We will create two groups: A keeps the original process, while B adds contact treatment. All other process conditions should be consistent. We plan to fabricate 12 devices per group.',
'First, we need consistent testing and extraction procedures. Contact resistance will be recorded in Ω·μm. Every comparison must include test conditions and valid sample sizes.',
'Contact treatment may change the interface state, but this is only a mechanism hypothesis. Even if resistance decreases, we cannot immediately attribute the change to that mechanism.',
'I will manage sample IDs and experiment logs and prepare a testing template by Friday. After the meeting, I will circulate the task list for review.',
],summary:['Target: reduce contact resistance by 20% relative to the control.','Plan: one M09 material batch; groups A and B, with 12 devices each.','Hypothesis: contact treatment may change the interface state; not yet verified.','Open question: define a threshold for an acceptable device yield.']},
{title:'First-round results',date:'09.12',mode:'Online',duration:'38 min',purpose:'Review initial data, sample definitions and experimental risks.',speeches:[
'Today we are reviewing first-round feasibility. With a small sample, report observations rather than claiming the treatment is effective. Please also clarify the minimum acceptable yield.',
'Both groups use the M09 batch, but two locations in group B show surface residue. I recorded the locations; we need to check whether they correspond to failed devices.',
'Of the 12 devices fabricated in group A, 10 passed initial screening. In group B, 8 out of 12 passed. These are screening counts, not the valid samples used to extract contact resistance.',
'In the currently valid data, median contact resistance is 820 Ω·μm for group A and 610 Ω·μm for group B. Six and five devices, respectively, meet the extraction criteria. I will review the data again tonight.',
'Using those two medians, group B is approximately 25.6% lower, but we cannot ignore selection bias. We should report a preliminary observation and retain the mechanism explanation as a hypothesis.',
'I will document why each device was excluded and link the original test files. Different spreadsheets use inconsistent definitions of valid devices, so I will separate screening passes from samples suitable for extraction.',
],summary:['Preliminary medians: A 820 and B 610 Ω·μm, pending review by Choi.','Extraction samples: A n=6 and B n=5; different from screening counts.','Risks: small samples, selection bias and surface residue.','Actions: Choi reviews the data; Han documents exclusion reasons.']},
{title:'Progress review',date:'09.23',mode:'Hybrid',duration:'41 min',purpose:'Revise the results, agree on report conclusions and plan next steps.',speeches:[
'The monthly report must distinguish targets, preliminary results and reviewed results. To proceed to the next stage, both groups must have a screening pass rate of at least 75%. We are setting this threshold today; do not describe it as a rule established at the start of the month.',
'We have matched residue locations to device IDs, but the evidence is insufficient to conclude that residue caused failure. I suggest controlling cleaning conditions in the next round.',
'Screening counts are unchanged: A is 10/12 and B is 8/12. Group B therefore does not meet the yield threshold set today.',
'I need to correct the B-group median from the previous report: 610 came from an older summary sheet. The reviewed value is 690 Ω·μm, with 5 valid samples. A remains 820, with 6 valid samples. Use review sheet v2.',
'With the revised value, the reduction is approximately 15.9%, not the earlier 25.6%, and it does not meet the 20% target. The result statement and related explanations need updating.',
'I will revise the values, reduction and conclusion in the monthly draft while retaining the previous version. Next week, we will add a cleaning-condition control; Lee should confirm the detailed arrangement.',
],summary:['Correction: Choi proposes revising B from 610 to 690 Ω·μm.','Impact: the reduction changes from 25.6% to 15.9%, below the 20% target.','Decision: Park proposes a 75% minimum screening pass rate for both groups, effective from this meeting.','Actions: revise the monthly report; Lee to confirm the next cleaning control.']},
];
