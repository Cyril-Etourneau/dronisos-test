import { ZodError } from "zod";
import { validateDrones, Drone } from "../src/drones/schema";

describe("validateDrones", () => {
    const validDrone: Drone = {
        name: "Alpha",
        position: [2.406108653349125, 0.05600097492475009, 0.12381700205659393],
        status: "OK",
    };

    it("validates an array of correct drones", () => {
        const input = [validDrone, { ...validDrone, name: "Beta" }];
        const result = validateDrones(input);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(validDrone);
        expect(result[1].name).toBe("Beta");
    });

    it("rejects when data is not an array", () => {
        const input: unknown = validDrone;
        expect(() => validateDrones(input)).toThrow(ZodError);
    });

    it("rejects when a required field is missing", () => {
        const input: unknown = [
            { position: validDrone.position, status: validDrone.status }, // name missing
        ];
        expect(() => validateDrones(input)).toThrow(ZodError);
    });

    it("rejects when name is not a string", () => {
        const input: unknown = [{ ...validDrone, name: 123 }];
        expect(() => validateDrones(input)).toThrow(ZodError);
    });

    it("rejects when status is not a string", () => {
        const input: unknown = [{ ...validDrone, status: 42 }];
        expect(() => validateDrones(input)).toThrow(ZodError);
    });

    it("rejects when position is not a tuple of 3 numbers", () => {
        const badInputs: unknown[] = [
            { ...validDrone, position: [1, 2] }, // too short
            { ...validDrone, position: [1, 2, 3, 4] }, // too long
            { ...validDrone, position: ["1", 2, 3] }, // wrong type
            { ...validDrone, position: [1, NaN, 3] }, // NaN
            { ...validDrone, position: null }, // null
            { ...validDrone, position: {} }, // object
            { ...validDrone, position: [Infinity, 2, 3] }, // Infinity (still a number, but test behavior)
        ];

        for (const bad of badInputs) {
            expect(() => validateDrones([bad as any])).toThrow(ZodError);
        }
    });

    it("rejects when outer array contains mixed valid and invalid items", () => {
        const input: unknown = [validDrone, { ...validDrone, position: [1, "bad", 3] }];
        expect(() => validateDrones(input)).toThrow(ZodError);
    });

    it("returns a properly typed Drone[]", () => {
        const input = [validDrone];
        const result = validateDrones(input);
        expect(Array.isArray(result)).toBe(true);
        const d = result[0];
        expect(typeof d.name).toBe("string");
        expect(Array.isArray(d.position)).toBe(true);
        expect(d.position).toHaveLength(3);
        expect(d.position.every((n: number) => typeof n === "number")).toBe(true);
        expect(typeof d.status).toBe("string");
    });

    it("does not mutate the input array or objects", () => {
        const input = [{ ...validDrone }, { ...validDrone, name: "Immutable" }];
        const frozen = Object.freeze(input.map(Object.freeze));
        const out = validateDrones(frozen as unknown as Drone[]);
        // Ensure original references untouched and output is a new array
        expect(out).not.toBe(frozen);
        expect(out[0]).toEqual(input[0]);
        expect(out[1]).toEqual(input[1]);
    });

    it("exposes ZodError with meaningful issues and paths", () => {
        const input: unknown = [{ ...validDrone, position: [1, "bad", 3] }];
        try {
            validateDrones(input);
            fail("Should have thrown a ZodError");
        } catch (e) {
            expect(e).toBeInstanceOf(ZodError);
            const issues = (e as ZodError).issues;
            // At least one issue should refer to position[1]
            expect(issues.some((i) => i.path.join(".") === "0.position.1")).toBe(true);
        }
    });

    it("handles empty array as valid (no drones)", () => {
        const input: unknown = [];
        const result = validateDrones(input);
        expect(result).toEqual([]);
    });
});
