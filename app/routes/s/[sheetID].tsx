import { config } from "https://deno.land/x/dotenv/mod.ts";
const {
  APP_BASE_URI
} = config();


import { Handlers, PageProps } from "$fresh/server.ts";

interface Sheet {
  sheetID: string;
  title: string;
}

export const handler: Handlers<Sheet | null> = {
  async GET(_, ctx) {
    const sheetID = ctx.params.sheetID;
    const resp = await fetch(`${APP_BASE_URI}/api/sheet/${sheetID}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const response_json = await resp.json();
    return ctx.render({sheetID:response_json['sheetId'],title:response_json['title']});
  },
};

export default function Page({ data }: PageProps<Sheet | null>) {
  if (!data) {
    return <h1>Sheet not found!</h1>;
  }

  return (
    <div>
      <h1>{data.sheetID}</h1>
      <h1>{data.title}</h1>
    </div>
  );
}
