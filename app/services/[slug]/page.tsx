import { notFound } from "next/navigation";
import { getImageUrls, getService } from "@/lib/strapi";
import { ServiceDetailView } from "@/components/app/ServiceDetailView";

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const [service, images] = await Promise.all([getService(slug), getImageUrls()]);
  if (!service) notFound();

  return (
    <ServiceDetailView
      service={service}
      heroImageUrl={service.directImageUrl ?? (service.imageKey ? images[service.imageKey] : undefined)}
    />
  );
}
