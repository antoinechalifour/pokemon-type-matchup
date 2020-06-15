import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useMemo, useState } from "react";

import { TypesLayout } from "@/components/Home/styles";
import { TypeMatchup } from "@/components/TypeMatchup/TypeMatchup";
import { TypeSelect } from "@/components/TypeSelect/TypeSelect";
import { TypeRepository, TypeWithDamages } from "@/repository/TypeRepository";
import { PageLayout } from "@/ui/Page/PageLayout";
import { PageContent } from "@/ui/Page/PageContent";
import { PageTitle } from "@/ui/Page/PageTitle";
import { VStack } from "@/ui/VStack";
import { Header } from "@/components/Header/Header";

interface HomeProps {
  types: TypeWithDamages[];
}

const useTypeSelection = (types: TypeWithDamages[]) => {
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);

  const primaryType = useMemo(() => {
    const primaryTypeId = selectedTypeIds[0];

    if (!primaryTypeId) return null;

    return types.find((x) => x.id === primaryTypeId)!;
  }, [types, selectedTypeIds]);

  const secondaryType = useMemo(() => {
    const secondaryTypeId = selectedTypeIds[1];

    if (!secondaryTypeId) return null;

    return types.find((x) => x.id === secondaryTypeId)!;
  }, [types, selectedTypeIds]);

  const addSelectedType = (typeId: number) => {
    if (selectedTypeIds.length === 2) return;

    setSelectedTypeIds([...new Set([...selectedTypeIds, typeId])]);
  };

  const removeSelectedType = (typeId: number) =>
    setSelectedTypeIds(selectedTypeIds.filter((x) => x !== typeId));

  return {
    selectedTypeIds,
    primaryType,
    secondaryType,
    addSelectedType,
    removeSelectedType,
  };
};

const Home: React.FC<HomeProps> = ({ types }) => {
  const {
    selectedTypeIds,
    primaryType,
    secondaryType,
    addSelectedType,
    removeSelectedType,
  } = useTypeSelection(types);

  return (
    <>
      <PageLayout>
        <Head>
          <title>Pokemon Type Matchup</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <PageContent>
          <VStack>
            <PageTitle>What are you up against?</PageTitle>

            <TypesLayout>
              {types.map((type) => (
                <li key={type.id}>
                  <TypeSelect
                    type={type}
                    isSelected={selectedTypeIds.includes(type.id)}
                    onSelect={addSelectedType}
                    onUnselect={removeSelectedType}
                  />
                </li>
              ))}
            </TypesLayout>

            {selectedTypeIds.length > 0 && (
              <TypeMatchup
                allTypes={types}
                primaryType={primaryType!}
                secondaryType={secondaryType}
              />
            )}
          </VStack>
        </PageContent>
      </PageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const types = await new TypeRepository().getAllTypes();

  return { props: { types } };
};

export default Home;
