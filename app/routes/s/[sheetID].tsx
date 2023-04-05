import { config } from "https://deno.land/x/dotenv/mod.ts";
const {
  APP_BASE_URI
} = config();


import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  _id: string;
  sheetID: string;
  title: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const sheetID = ctx.params.sheetID;
    const resp = await fetch(`${APP_BASE_URI}/api/sheet/${sheetID}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const response_json = await resp.json();
    console.log(response_json);
    return ctx.render({_id:response_json['_id'],sheetID:response_json['sheetID'],title:response_json['title']});
  },
};

export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      {/* <img src={data._id} width={64} height={64} /> */}
      <h1>{data._id}</h1>
      <h1>{data.sheetID}</h1>
      <h1>{data.title}</h1>
    </div>
  );
}
