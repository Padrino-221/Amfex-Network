"use client";

import { use } from "react";
import ResourceFormPage from "@/components/admin/ResourceFormPage";
import { adminApi } from "@/lib/admin-api";
import { getResource } from "@/lib/admin-resources";

export default function EditResourcePage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = use(params);
  const config = getResource(resource);

  if (!config) {
    return <p className="text-sm text-charcoal/60">Unknown section: {resource}</p>;
  }

  return (
    <ResourceFormPage
      id={id}
      resourceLabel={config.singular}
      backHref={`/admin/${config.slug}`}
      fields={config.fields}
      get={async (i) => (await adminApi.getOne<Record<string, unknown>>(config.slug, i)) as Record<string, unknown>}
      create={async (payload) => {
        const created = await adminApi.createItem<{ id: string }>(config.slug, payload);
        return { id: created.id };
      }}
      update={async (i, payload) => {
        await adminApi.updateItem(config.slug, i, payload);
      }}
      autoSlug={config.slug === "posts" || config.slug === "books"}
    />
  );
}
