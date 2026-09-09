import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'知序 · IBS 研究团队工作台',description:'从六人会议记录、信息核查到项目记忆与月度进展的交互原型。虚构研究场景。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
