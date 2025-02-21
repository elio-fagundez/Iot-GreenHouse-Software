import { HowItWorks } from "@/components/howtoworks/hot-it-works";
import LayoutHome from "../LayoutHome";


export const metadata = {
  title: "Bloomiot - How works",
  description:
    "Discover Bloomiot's smart greenhouse solutions. Monitor and manage your greenhouse with our IoT web platform.",
  keywords:
    "smart greenhouse, IoT, agriculture, Bloomiot, greenhouse monitoring, greenhouse management",
};

export default function Page() {
  return (
    <LayoutHome>
      <main>
        <HowItWorks />
      </main>
    </LayoutHome>
  );
}
