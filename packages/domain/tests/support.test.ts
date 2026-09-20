import { describe, expect, it } from "vitest";
import {
  SupportDestination,
  SupportFrequency,
  SupportRecord,
  SupportStatus,
} from "../src";

describe("SupportRecord", () => {
  it("creates a general support pledge without a target", () => {
    const record = SupportRecord.create({
      donorId: "donor-1",
      destination: SupportDestination.GENERAL,
      amountCents: 5000,
      frequency: SupportFrequency.ONE_TIME,
      animalId: null,
      campaignId: null,
      animalNeedId: null,
      message: null,
      status: SupportStatus.PLEDGED,
    });

    expect(record.toJSON()).toMatchObject({
      amountCents: 5000,
      destination: SupportDestination.GENERAL,
      status: SupportStatus.PLEDGED,
    });
  });

  it("requires a campaign for campaign support", () => {
    expect(() =>
      SupportRecord.create({
        donorId: "donor-1",
        destination: SupportDestination.CAMPAIGN,
        amountCents: 5000,
        frequency: SupportFrequency.ONE_TIME,
        animalId: null,
        campaignId: null,
        animalNeedId: null,
        message: null,
        status: SupportStatus.PLEDGED,
      }),
    ).toThrow("campaignId is required");
  });
});
