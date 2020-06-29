import { useTranslation } from "i18n";
import { NextPage } from "next";
import {
  InternalContainer,
  InternalMainWrapper
} from "pages/landing-page/components/internal/internal.blocks";
import TermsSection from "pages/landing-page/components/terms-section/terms-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Terms: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page:page-titles.terms")}>
      <InternalMainWrapper isSmallFont>
        <InternalContainer>
          <TermsSection />
        </InternalContainer>
      </InternalMainWrapper>
    </Layout>
  );
};

Terms.getInitialProps = async () => ({
  namespacesRequired: ["landing-page"]
});
