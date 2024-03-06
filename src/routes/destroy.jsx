import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  // ⚠️ throw an error in the destroy action
  // throw new Error("Error!!");
  await deleteContact(params.contactId);
  return redirect("/");
}
