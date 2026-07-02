import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimalSex, AnimalSize, AnimalSpecies, AnimalStatus } from "@anjos/domain";
import { AnimalCard } from "../src";

describe("AnimalCard", () => {
  it("renders animal core information and public actions", () => {
    render(
      <AnimalCard
        animal={{
          id: "1",
          name: "Mel",
          species: AnimalSpecies.DOG,
          sex: AnimalSex.FEMALE,
          size: AnimalSize.SMALL,
          approximateAge: "2 anos",
          description: "Docil e vacinada",
          photoUrl: null,
          status: AnimalStatus.AVAILABLE,
          specialNeeds: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }}
      />
    );

    expect(screen.getByRole("heading", { name: "Mel" })).toBeInTheDocument();
    expect(screen.getByText("Cachorro")).toBeInTheDocument();
    expect(screen.getByText("Disponivel")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tenho interesse" })).toBeInTheDocument();
  });
});
