import { Navigate, Route, Routes } from "react-router";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductDetailsPage } from "@/pages/ProductDetailsPage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SolutionDetailsPage } from "@/pages/SolutionDetailsPage";
import { IndustriesPage } from "@/pages/IndustriesPage";
import { IndustryDetailsPage } from "@/pages/IndustryDetailsPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { LegalPage } from "@/pages/LegalPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ServicePage } from "@/pages/ServicePage";
import { VoiceAgentsPage } from "@/pages/VoiceAgentsPage";
import { PackagesPage } from "@/pages/PackagesPage";
import { LeadershipPage } from "@/pages/LeadershipPage";
import { PlatformPage } from "@/pages/PlatformPage";
import { CompanyStoryPage } from "@/pages/CompanyStoryPage";
import { OfficePage } from "@/pages/OfficePage";
import { PartnerPage } from "@/pages/PartnerPage";
import { InvestorPage } from "@/pages/InvestorPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/company/story" element={<CompanyStoryPage />} />
        <Route path="/company/office" element={<OfficePage />} />
        <Route path="/company/partner" element={<PartnerPage />} />
        <Route path="/company/investor" element={<InvestorPage />} />
        <Route path="/services" element={<Navigate to="/services/software-services" replace />} />
        <Route path="/services/hardware-procurement" element={<Navigate to="/services/software-services" replace />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/ai-voice-agents" element={<VoiceAgentsPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailsPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/:slug" element={<SolutionDetailsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
