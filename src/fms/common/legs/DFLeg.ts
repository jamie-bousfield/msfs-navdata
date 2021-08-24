import { Waypoint } from '../Waypoint';
import { AltitudeConstraint, Leg, PathVector, PathVectorType, SpeedConstraint } from "./index";
import { Degrees, Feet, FeetPerMinute, Knots, Location, NauticalMiles } from "../../../shared/types/Common";
import { Type4Transition } from '../transitions/Type4';
import { ControlLaw, GuidanceParameters } from '../ControlLaws';

export class DFLeg implements Leg {
    public from: Type4Transition;
    public to: Waypoint;

    constructor(from: Type4Transition, to: Waypoint) {
        this.from = from;
        this.to = to;
    }

    get identifier(): string {
        return this.to.identifier;
    }

    get altitudeConstraint(): AltitudeConstraint | undefined {
        return this.to.altitudeConstraint;
    }

    get bearing(): Degrees {
        return Avionics.Utils.computeGreatCircleHeading(
            this.from.ftp,
            this.to.coordinates,
        );
    }

    get distance(): NauticalMiles {
        return Avionics.Utils.computeGreatCircleDistance(
            this.from.ftp,
            this.to.coordinates,
        );
    }

    getDistanceToGo(ppos: LatLongData): NauticalMiles {
        const bearingPposTf = Avionics.Utils.computeGreatCircleHeading(ppos, this.to.coordinates);
        if (Avionics.Utils.diffAngle(bearingPposTf, this.bearing) > 180 {
            return 0;
        }
        return Avionics.Utils.computeGreatCircleDistance(ppos, this.to.coordinates);
    }

    getGuidanceParameters(ppos: Location, trueTrack: Degrees): GuidanceParameters {
        // track angle error
        const desiredTrack = Avionics.Utils.computeGreatCircleHeading(ppos, this.to.coordinates);
        const trackAngleError = MathUtils.mod(desiredTrack - trueTrack + 180, 360) - 180;

        return {
            law: ControlLaw.LATERAL_PATH, // TODO should be track?
            trackAngleError,
            crossTrackError: 0,
            phiCommand: 0,
        };
    }

    getPseudoWaypointLocation(distanceBeforeTerminator: number): Location | undefined {
        const dist = this.distance - distanceBeforeTerminator;
        return Avionics.Utils.bearingDistanceToCoordinates(
            Avionics.Utils.computeGreatCircleHeading(this.from.ftp.coordinates, this.to.coordinates),
            dist,
            this.to.coordinates.lat,
            this.to.coordinates.lon
        );
    }

    get initialLocation(): Location | undefined {
        return undefined;
    }

    isAbeam(ppos: Location) {
        return false;
    }

    get isCircularArc(): boolean {
        return false;
    }

    get speedConstraint(): SpeedConstraint | undefined {
        return undefined;
    }

    get terminatorLocation(): Location | undefined {
        return undefined;
    }

    public getPredictedPath(isActive: boolean, ppos: Location, altitude: Feet, groundSpeed: Knots, verticalSpeed: FeetPerMinute): PathVector[] {
        return [
            {
                type: PathVectorType.Line,
                startPoint: this.from.ftp,
                endPoint: this.to.coordinates,
            },
        ];
    }
}
