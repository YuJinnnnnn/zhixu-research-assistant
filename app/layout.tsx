import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Zhixu · Research memory assistant',description:'Good research remembers. Explore a research memory assistant through a fictional six-person IBS team, from meetings to verified insights.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
