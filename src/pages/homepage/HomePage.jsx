import Banner from "../../components/home/banneer/Banner";
import CatalogoBanner from "../../components/home/catalogobanner/CatalogoBanner";
import CollageBanner from "../../components/home/callegebanner/CollageBanner";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <CatalogoBanner />
      <CollageBanner />
    </div>
  );
}
