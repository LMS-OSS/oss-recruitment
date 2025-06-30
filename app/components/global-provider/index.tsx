"use client";

import antdTheme from "@/app/config/antdTheme";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

export default function GlobalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <AntdRegistry>
      <ConfigProvider theme={antdTheme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
}
