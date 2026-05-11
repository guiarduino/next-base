import TopMenu from "../components/top-menu";
import LeftMenu from "../components/left-menu/left-menu";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex h-screen layout">
      <div className="left-menu">
        <LeftMenu />
      </div>
      <div className="top-menu">
        <TopMenu />
      </div>
      <div className="content flex-1 p-4">
        {children}
      </div>
    </div>
  );
}