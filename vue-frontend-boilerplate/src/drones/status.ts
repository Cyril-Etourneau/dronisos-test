/**
 * Defines possible states of a drone.
 */
enum DroneStatus {
    Ok = "OK",
    LostLink = "LOST_LINK",
    BadConfig = "BAD_CONFIG",
    MotorKo = "MOTOR_KO",
    LowBattery = "LOW_BATTERY",
}

export { DroneStatus };
