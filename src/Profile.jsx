/* eslint-disable react/prop-types */

import { format } from "date-fns";
import React from "react";

// eslint-disable-next-line no-unused-vars
export default function Profile(props) {
  // Check if props.owner exists before accessing its properties
  if (!props.owner) {
    return <div>Loading...</div>;
  }

  // Check if props.created_at is a valid date before formatting
  const createdAtDate = props.created_at ? new Date(props.created_at) : null;

  return (
    <>
      <article className="bg-white p-5 rounded shadow shadow-indigo-500 hover:scale-105  duration-300 transition-all">
        <div className="flex items-center">
          <img
            src={props.owner.avatar_url}
            alt={props.owner.login}
            className="w-10 h-10 shadow rounded-full"
          />
          <ul className="ml-5">
            <p className="mr-2 font-semibold text-lg  mt-4">{props.name}</p>

            <div className="flex gap-12">
              <h2 className="font-medium text-sm mt-2">{props.owner.login}</h2>
              <div>
                {props.private ? (
                  <p className="bg-rose-700 py-1 px-4 rounded-lg shadow text-white text-xs inline-block opacity-75">
                    Private
                  </p>
                ) : (
                  <p className="bg-indigo-700 py-1 px-4 rounded-lg shadow text-white text-xs inline-block opacity-75 ">
                    Public
                  </p>
                )}
              </div>
            </div>
          </ul>
        </div>

        <div>
          <p className="mt-2">
            This repository was created on{" "}
            {createdAtDate
              ? format(createdAtDate, "dd MMMM yyyy")
              : "Unknown date"}{" "}
            by {props.owner.login}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between text-right">
          <a
            className="text-sm cursor-pointer bg-transparent border border-indigo-700 text-indigo-700 py-1 px-4 rounded-lg shadow hover:scale-110  duration-300 transition-all"
            href={props.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View Repo
          </a>
          <ul>
            {/* Check if props.stargazers_count is defined before displaying */}
            <li>
              {props.stargazers_count !== undefined
                ? `${props.stargazers_count} stars`
                : "Stars count not available"}
            </li>
            {/* Check if props.watchers_count is defined before displaying */}
            <li>
              {props.watchers_count !== undefined
                ? `${props.watchers_count} Watchers`
                : "Watchers count not available"}
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between flex-wrap mt-5">
          <ul className="text-xs flex items-center justify-start">
            <li className="py-1 px-2 text-white bg-indigo-700 opacity-75 rounded-lg shadow inline-block mr-2 ">
              {props.language}
            </li>

            {props.topics &&
              props.topics.map((topic, index) => (
                <React.Fragment key={index}>
                  <li className="py-1 px-2 text-white bg-emerald-700 opacity-75 rounded-lg shadow inline-block mr-2">
                    {topic}
                  </li>
                </React.Fragment>
              ))}
          </ul>

          <p>{props.open_issues} issues</p>
        </div>
      </article>
    </>
  );
}
