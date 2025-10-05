"use client";
import { useUser } from "@/app/hooks/user";
import { useAuth } from "@/app/utils/useAuth";
import CandidatePreview from "@/app/components/common/information-preview";
import { useMemo } from "react";
import { Col, Row, Space, Tabs } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { PDFViewer } from "@/app/utils/pdf-viewer";

export default function PreviewComponent() {
  const { user_id } = useAuth();
  const { data: detailUserData } = useUser({ id: user_id! });

  const tabs = useMemo(
    () => [
      {
        key: "cv",
        label: (
          <Space>
            <FilePdfOutlined />
            Curriculum Vitae
          </Space>
        ),
        children: <PDFViewer src={detailUserData?.curiculum_vitae_url} />,
      },
      {
        key: "cert",
        label: (
          <Space>
            <FilePdfOutlined />
            Portofolio
          </Space>
        ),
        children: <PDFViewer src={detailUserData?.portfolio_url} />,
      },
    ],
    [detailUserData?.curiculum_vitae_url, detailUserData?.portfolio_url]
  );

  return (
    <Row gutter={[16, 16]}>
      {/* LEFT PANEL */}
      <Col xs={24} md={8}>
        {/* Profile card */}

        {/* Contact info */}
        <CandidatePreview
          email={detailUserData?.email}
          phone={detailUserData?.phone}
          dateOfBirth={detailUserData?.date_of_birth}
          cvUrl={detailUserData?.curiculum_vitae_url}
          portfolioUrl={detailUserData?.portfolio_url}
        />
      </Col>

      {/* RIGHT PANEL */}
      <Col xs={24} md={16}>
        <Tabs
          items={tabs}
          defaultActiveKey="cv"
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 8,
          }}
          tabBarStyle={{ marginBottom: 12 }}
        />
      </Col>
    </Row>
  );
}
