import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'知序 · 长期记忆研究助理',description:'有来源、可纠正的跨会话记忆交互演示'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
