import { z } from "zod";

/**
 * Zod schema describing a single Drone.
 *
 * Structure:
 * - name: non-empty string identifier
 * - position: 3-number tuple [x, y, z]
 * - status: string representing the drone's state
 */
const DroneSchema = z.object({
    name: z.string(),
    position: z.tuple([z.number(), z.number(), z.number()]),
    status: z.string(),
});

/**
 * Type inferred from DroneSchema.
 */
type Drone = z.infer<typeof DroneSchema>;

/**
 * Zod schema for an array of drones.
 */
const DronesArraySchema = z.array(DroneSchema);

/**
 * Validate unknown input as an array of drones.
 *
 * @param data - Unknown input to validate.
 * @returns A typed array of Drone if validation succeeds.
 * @throws {z.ZodError} When input does not conform to DronesArraySchema.
 *
 * @example
 * const drones = validateDrones([
 *   { name: 'Alpha', position: [0, 0, 0], status: 'OK' },
 * ]);
 */
function validateDrones(data: unknown): Drone[] {
    return DronesArraySchema.parse(data);
}

export { Drone, validateDrones };
