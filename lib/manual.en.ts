import type {Chapter} from './manual';

export const chaptersEn:Chapter[]=[
  {id:'start',group:'Getting started',title:'Meet Zhixu',intro:'Zhixu is a meeting-information workspace for research teams. It brings meeting records, contributor analysis and research-report generation into one project.',sections:[
    {title:'What the current demo includes',columns:['Page','Primary purpose'],rows:[['Overview','See the project’s meetings, contributors and report entry points'],['Meetings','Read a summary or the full transcript of each meeting'],['Memory','Explore speaking volume, semantic overlap and key evidence'],['AI Assistant','Select meetings and generate a downloadable progress report']]},
    {title:'Suggested walkthrough',steps:['Start with Overview to understand what the project contains.','Open Meetings and compare the summaries and transcripts.','Use Memory to explore individual contributions and semantic overlap.','Open AI Assistant, choose meetings and generate a progress report.']},
    {title:'Project scenario',text:'The demo uses IBS · 2D Materials as a fictional research project with three meetings and six participants. All people, dates, statements and research values are illustrative.',note:'This version uses browser-local storage. It does not connect to real recording, identity verification, cloud synchronization or a live AI model.'}
  ]},
  {id:'overview',group:'Features',title:'Overview',intro:'Overview is the project’s starting point. It summarizes the available content and provides direct access to each working area.',sections:[
    {title:'Three entry points',columns:['Entry','What it shows','Destination'],rows:[['Meetings','Number of meetings in the project','Meeting records'],['Contributors','Number of discussion participants','Memory semantic map'],['Report','Available report workflow','Report generator']]},
    {title:'Recent meetings',text:'The three meetings are listed by date. Selecting one opens that meeting directly in Meetings.'},
    {title:'Next steps',text:'The latest follow-up actions are shown in one place so the team can see what comes next before opening the detailed records.'}
  ]},
  {id:'meetings',group:'Features',title:'Meetings',intro:'Meetings contains the record of each discussion. Users can switch between three meetings and read either a concise summary or the complete transcript.',sections:[
    {title:'Choose a meeting',text:'The top controls switch between Project planning, First round and Progress. The title, format, participant count, duration and content update with the selection.'},
    {title:'Summary',text:'Summary groups the main statements by speaker for quick reading. Each person is identified by name and job title.'},
    {title:'Transcript',text:'Transcript presents the full discussion in time order. Each entry retains the speaker, job title and timestamp so the original context remains visible.'},
    {title:'How to use it',steps:['Choose the meeting you want to review.','Read Summary for a quick overview.','Switch to Transcript when you need the exact discussion context.','Continue to Memory when you want to compare contributions.']}
  ]},
  {id:'memory',group:'Features',title:'Memory',intro:'Memory turns the prepared transcripts into a contributor visualization. It shows who shaped the discussion, where ideas overlap and who introduced key evidence.',sections:[
    {title:'Choose the analysis range',text:'View All meetings or isolate Planning, First round or Progress. Each range has its own semantic map, speaking totals and key evidence.'},
    {title:'Semantic overlap',text:'Each colored area represents one participant. Its size reflects character count, while overlap indicates semantic similarity between contributions. The diagram shows relative relationships, not statistical significance.'},
    {title:'Contributors',text:'The right column lists each participant’s name, role, character count and share. Key evidence appears inside the card of the person who introduced it.'},
    {title:'Isolate one contribution',steps:['Select a participant in the semantic map or the contributor list.','The selected participant remains clear while the others fade.','Select the same participant again to restore the complete view.'],note:'Character counts, shares and overlap scores are fictional demo metrics derived from the prepared transcripts.'}
  ]},
  {id:'assistant',group:'Features',title:'AI Assistant',intro:'AI Assistant currently focuses on one task: generating a research progress report from meetings selected by the user.',sections:[
    {title:'Choose the report scope',text:'No meetings are selected initially. Choose one, several or All meetings. Generate report becomes available after at least one meeting is selected.'},
    {title:'Generate a report',steps:['Select the meetings to include.','Choose Generate report.','The generated progress report appears below the controls.','Change the selection and regenerate when you need a different scope.']},
    {title:'Download the result',text:'A Download button appears after generation. The Markdown file can be edited, archived or moved into another document.'},
    {title:'Content boundary',text:'Only selected meetings are included in the current report. The demo uses fixed generation rules to demonstrate the workflow; it does not call a live model.'}
  ]},
  {id:'demo',group:'Using the demo',title:'Demo information',intro:'This version demonstrates Zhixu’s product structure and interaction model. It should not be used with real research material.',sections:[
    {title:'Data and identity',columns:['Area','Current state'],rows:[['People and research values','Entirely fictional'],['Meeting recording','Not connected; prepared transcripts only'],['User switching','Demonstrates viewpoints, not identity verification'],['Data storage','Stored locally in this browser'],['Cross-device synchronization','Not connected'],['Report generation','Fixed-rule demonstration; no live model']]},
    {title:'Language switching',text:'Chinese and English use the same project structure. Switching language changes the interface and prepared content, not the underlying project.'},
    {title:'Clearing browser data',text:'Some demo state remains after refresh through local storage. Clearing this site’s browser data removes that local state.'}
  ]}
];
