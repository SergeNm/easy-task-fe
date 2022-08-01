import React from "react";
import { useSelector } from "react-redux";
import AllTasks from "./AllTasks";
import DailyTasks from "./DailyTasks";

const Kid = () => {
  const {tab} = useSelector((state) => state.user);
  console.log("🚀 ~ file: Kid.jsx ~ line 8 ~ Kid ~ tab", tab)
  return tab === "All tasks" ? (
    <AllTasks />
  ) : tab === "Daily tasks" ? (
    <DailyTasks />
  ) : (
    <div>Kid</div>
  );
};

export default Kid;
