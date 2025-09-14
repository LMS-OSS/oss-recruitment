"use client";

import { Card, Col, Row, Typography } from "antd";
import { usePathname } from "next/navigation";
import { RecruitmentProvider, useRecruitment } from "./context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HeaderStatusCard from "./content/HeaderTarget";

const { Title, Text } = Typography;

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = (pathname ?? "").split("/").filter(Boolean);
  const baseIndex = segments.indexOf("recruitment");
  const active =
    baseIndex >= 0 && segments[baseIndex + 1] ? segments[baseIndex + 1] : "all";

  const { summary, sectionTitle, sectionSubtitle } = useRecruitment();

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      <Card style={{ marginBottom: 24 }}>
        <Title level={5} style={{ marginBottom: 0 }}>
          Applicant Status
        </Title>
        {sectionSubtitle && (
          <Text type="secondary" style={{ fontSize: 14 }}>
            {sectionSubtitle}
          </Text>
        )}
        <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
          {summary.map((s) => {
            const isActive =
              (active === "all" && s.key === "all") || s.key === active;
            return (
              <Col key={s.key}>
                  <HeaderStatusCard
                    k={s.key}
                    label={s.label}
                    count={s.count}
                    active={isActive}
                  />
              </Col>
            );
          })}
        </Row>
      </Card>

      {/* Judul section konten */}
      <div style={{ marginBottom: 12 }}>
        <Title level={5} style={{ marginBottom: 0 }}>
          {sectionTitle}
        </Title>
      </div>

      {/* Konten halaman anak (dinamis) */}
      {children}
    </div>
  );
}

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecruitmentProvider>
        <Shell>{children}</Shell>
      </RecruitmentProvider>
    </DndProvider>
  );
}
