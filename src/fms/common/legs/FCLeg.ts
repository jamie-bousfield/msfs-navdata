import { AltitudeConstraint, Leg, SpeedConstraint } from "./index";
import { Waypoint } from "../Waypoint";
import { Degrees, Location, NauticalMiles } from "../../../shared/types/Common";

export class FCLeg implements Leg {

    public readonly from: Waypoint;

    private readonly mCourse: number;

    private readonly mDistance: number;

    constructor(from: Waypoint, distance: number, course: number) {
        this.mDistance = distance;
        this.mCourse = course;
        this.from = from;
    }

    get identifier(): string {
        return `(${this.mDistance})`
    }

    get altitudeConstraint(): AltitudeConstraint | undefined
    {
        return undefined;
    }

    get bearing(): Degrees
    {
        return this.mCourse;
    }

    get distance(): NauticalMiles
    {
        return this.mDistance;
    }

    getDistanceToGo(ppos: Location): NauticalMiles
    {
        return 0;
    }

    getGuidanceParameters(ppos: Location, trueTrack: Degrees)
    {
        return undefined as any;
    }

    getNominalRollAngle(gs: number): Degrees
    {
        return 0;
    }

    getPseudoWaypointLocation(distanceBeforeTerminator: number): Location | undefined
    {
        return undefined;
    }

    get initialLocation(): Location | undefined
    {
        return undefined;
    }

    isAbeam(ppos: Location)
    {
        return false;
    }

    get isCircularArc(): boolean
    {
        return false;
    }

    get speedConstraint(): SpeedConstraint | undefined
    {
        return undefined;
    }

    get terminatorLocation(): Location | undefined
    {
        return undefined;
    }
}
