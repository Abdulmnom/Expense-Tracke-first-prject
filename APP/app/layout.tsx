import { ReactNode } from "react";
import { Metadata } from "next";
import hsoubLogo from './assets/hsoub-logo.ico';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Expense tracker is a tool designed to help track financial transactions",
  authors: [
    { name: "Hsoub Academy" },
    { name: "Abdulmnoum Abdullh" }
  ],
  icons: [{ rel: "icon", url: hsoubLogo.src }],
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={hsoubLogo.src} />
      </head>
      <body>{children}</body>
    </html>
  );
}