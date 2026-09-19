import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";

export function NotFoundPage() {
  return (
    <>
      <Seo path="/404" title="Not found" description="This page does not exist." />
      <Container className="pb-24">
        <h1 className="font-display text-4xl text-white">Page not found</h1>
        <p className="mt-4 text-muted">The page you requested is not in the catalog.</p>
        <Link to="/" className="mt-6 inline-flex text-accent-strong">
          Back home
        </Link>
      </Container>
    </>
  );
}
