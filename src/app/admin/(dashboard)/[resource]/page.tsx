"use client";

import { use } from "react";
import ResourceList from "@/components/admin/ResourceList";
import { adminApi } from "@/lib/admin-api";
import { getResource } from "@/lib/admin-resources";
import { PageHeader } from "@/components/admin/ui";

type Row = Record<string, unknown> & { id: string };

export default function ResourceListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params);
  const config = getResource(resource);

  if (!config) {
    return (
      <div>
        <PageHeader title="Unknown section" />
        <p className="text-sm text-charcoal/60">No admin section found for “{resource}”.</p>
      </div>
    );
  }

  const searchText = (row: Row) =>
    config.searchFields.map((f) => String(row[f] ?? "")).join(" ");

  return (
    <ResourceList<Row>
      title={config.label}
      description={config.description}
      newHref={`/admin/${config.slug}/new`}
      columns={config.columns}
      fetcher={() => adminApi.listAll<Row>(config.slug)}
      deleter={(id) => adminApi.deleteItem(config.slug, id)}
      editHref={(row) => `/admin/${config.slug}/${row.id}`}
      searchText={searchText}
      publishable={
        config.hasPublished
          ? {
              isPublished: (row) => Boolean(row.published),
              toggle: async (row) => {
                await adminApi.updateItem(config.slug, row.id, { published: !row.published });
              },
            }
          : undefined
      }
    />
  );
}
