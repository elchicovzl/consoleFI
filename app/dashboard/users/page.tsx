import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";
import getUsers from "@/app/actions/getUsers";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Users",
  description: "Users Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/app/dashboard/users/data/users.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const users = await getUsers()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            List of Users for administration.
          </p>
        </div>
      </div>
      <p className="ml-auto">
          <Link 
              className="
                  inline-flex items-center justify-center rounded-md text-sm
                  font-medium transition-colors focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50
                  disabled:pointer-events-none ring-offset-background
                  border border-input hover:bg-accent hover:text-accent-foreground
                  h-10 py-2 px-4
              "
              href={"/dashboard/users/create"}
          >
              Create
          </Link>
      </p>
      <DataTable data={users} columns={columns} />
    </div>
  )
}