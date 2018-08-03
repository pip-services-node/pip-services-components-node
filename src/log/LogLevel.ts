/** @module log */
/**
 * Enumeration for defining log levels.
 */
export enum LogLevel {
    /** Messages that do not have a log level. */
    None = 0,
    /** Messages that contain information about very severe error events that will presumably cause an abort. */
    Fatal,
    /** Messages that contain information about error events that can still allow a service to continue running. */
    Error,
    /** Messages that contain information about potentially harmful situations. */
    Warn,
    /** Designates informational messages that highlight the progress of the application at coarse-grained level. */
    Info,
    /** Messages that contain fine-grained informational events that can be useful during debugging. */
    Debug,
    /** Messages that contain finer-grained informational events than Debug. */
    Trace
}