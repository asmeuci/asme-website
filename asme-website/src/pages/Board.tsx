import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Section from "@/components/Section";
import BoardCommittees from "@/components/BoardCommittees";
import DropdownSelect from "@/components/DropdownSelect";
import { boardYears, defaultBoardYearId } from "@/model/BoardDirectory";

function Board() {
  const [selectedYearId, setSelectedYearId] = useState(defaultBoardYearId);

  const selectedYear = useMemo(
    () => boardYears.find((boardYear) => boardYear.id === selectedYearId) ?? boardYears[0],
    [selectedYearId]
  );

  if (!selectedYear) {
    return (
      <Layout>
        <Section>
          <div className="pt-28">
            <h1 className="font-helvetica text-4xl font-medium tracking-tighter md:text-5xl">Board data coming soon.</h1>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section>
        <div className="h-full w-full space-y-8 pt-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="font-helvetica text-6xl font-medium tracking-tighter md:text-7xl">
              Meet the <br />
              <span>ASME Board</span>
            </h1>

            <DropdownSelect
              label="Year"
              value={selectedYear.id}
              onChange={setSelectedYearId}
              options={boardYears.map((boardYear) => ({
                value: boardYear.id,
                label: boardYear.label,
              }))}
              className="md:items-end"
            />
          </div>

          <p className="font-helvetica text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {selectedYear.label} Board
          </p>

          <img src={selectedYear.heroImage} className="h-full w-full rounded-2xl object-contain shadow-2xl" alt="ASME Board" />
        </div>
      </Section>

      <Section>
        <BoardCommittees committees={selectedYear.committees} heading={`Get to know our ${selectedYear.label} team`} />
      </Section>
    </Layout>
  );
}

export default Board;
