export enum StatusType {
	/**
	 * Path is in idle state.
	 */
	Idle = "Idle",
	/**
	 * Path is in active state.
	 * @
	 */
	Active = "Active"
}

export enum ErrorType {
	/**
	 * The elapsed time between **Path.Run** calls is less than Settings.TIME_VARIANCE. For stability purposes, this error is invoked after **Path:Run()** yields for Settings.TIME_VARIANCE.
	 *
	 * It is recommended to avoid depending on this ErrorType.
	 */
	LimitReached = "LimitReached",
	/**
	 * Target is unreachable.
	 */
	TargetUnreachable = "TargetUnreachable",
	/**
	 * Path computation failed.
	 */
	ComputationError = "ComputationError",
	/**
	 * Agent is stuck (possibly due to an obstruction of some kind).
	 */
	AgentStuck = "AgentStuck"
}

interface SimplePathConfiguration {
	/**
	 * Represents the minimum time in seconds elapsed between **Path.Run** calls. The default setting is roughly 14 computations per second. 
	 * 
	 * This is necessary to allow the agent the freedom for movement (give the agent some time to reach the next waypoint before computing a new path).
	 */
	TIME_VARIANCE: number,
	/**
	 * During pathfinding, in the case where the agent is stationary at the same position for 1 + COMPARISON_CHECKS consecutive **Path.Run** calls, the agent attempts to avoid the obstruction by jumping. 
	 * 
	 * This is necessary in order to prevent the agent from being at rest for infinity (unless otherwise moved by an external object).
	 */
	COMPARISON_CHECKS: number,
	/**
	 * `Settings.JUMP_WHEN_STUCK` is directly dependant on `Settings.COMPARISON_CHECKS`. If this is false, the agent will not attempt to jump.
	 */
	JUMP_WHEN_STUCK: boolean,
}

interface SimplePath {
	/**
	 * Set this property to true before the first **Path:Run()** to visualize waypoints.
	 */
	Visualize: boolean

	/**
	 * Returns the current [**StatusType**](https://grayzcale.github.io/simplepath/api-reference/#statustypes) of Path.
	 */
	readonly Status?: StatusType
	/**
	 * Returns the last [**ErrorType**](https://grayzcale.github.io/simplepath/api-reference/#errortypes).
	 */
	readonly LastError?: ErrorType

	/**
	 * This method returns true if the computation was successful. If it returns false, the **Path.Error** event is fired with a ComputationError. 
	 * 
	 * This method automatically yields if the elapsed time between consecutive calls is less than Settings.TIME_VARIANCE.
	 * 
	 * @param this The current SimplePath Object
	 * @param target Where should the humanoid go?
	 */
	Run(this: SimplePath, target: Vector3 | BasePart): boolean

	/**
	 * Stops the navigation of the current Path if [**Path.Status**](https://grayzcale.github.io/simplepath/api-reference/#status) is in an active state and fires the **Path.Stopped** event.
	 * @param this The current SimplePath Object
	 */
	Stop(this: SimplePath): void

	/**
	 * Destroy Path.
	 * @param this The current SimplePath Object
	 */
	Destroy(this: SimplePath): void

	/** 
	 * This event is fired after the `agent` reaches its target and returns the final `PathWaypoint`.
	*/
	readonly Reached: RBXScriptSignal<(agent: Model, finalWaypoint: PathWaypoint) => void>

	/**
	 * This event is fired every time the next `PathWaypoint` is reached.
	 */
	readonly WaypointReached: RBXScriptSignal<(agent: Model, last: PathWaypoint, next: PathWaypoint) => void>

	/**
	 * `blocked` is a `PathWaypoint` such that: `currentWaypoint.Index <= blocked.Index <= currentWaypoint.Index + 1`.
	 */
	readonly Blocked: RBXScriptSignal<(agent: Model, blocked: PathWaypoint) => void>

	/**
	 * Fires when an error from any of the [**ErrorTypes**](https://grayzcale.github.io/simplepath/api-reference/#errortypes) occurs.
	 */
	readonly Error: RBXScriptSignal<(error: ErrorType) => void>

	/**
	 * Fires after **Path:Stop()** is called.
	 */
	readonly Stopped: RBXScriptSignal<(agent: Model) => void>
}

interface SimplePathConstructor {
	/**
	 * Creates a new Path object using the `agent` with optional `agentParameters`. 
	 * Pass in `override` as a dictionary that includes a [setting](https://grayzcale.github.io/simplepath/api-reference/#configuration) and its overridden value.
	 */
	new(agent: Model, agentParameters?: AgentParameters, override?: Partial<SimplePathConfiguration>): SimplePath
	
	/**
	 * Returns a model of the nearest character from the provided Vector3 position or nil if no character is found.
	 * @param fromPosition The vector3 to get the nearest character from
	 */
	GetNearestCharacter(fromPosition: Vector3): Model | undefined
}

declare const SimplePath: SimplePathConstructor
export default SimplePath;