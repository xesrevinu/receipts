import { Rx } from "@effect-rx/rx-react"
import {
  EventJournal,
  EventLog,
  EventLogEncryption,
  EventLogRemote,
} from "@effect/experimental"
import { Identity } from "@effect/experimental/EventLog"
import { Context, Effect, Layer } from "effect"
import { ReceiptAppEvents } from "./Events"
import { ReceiptGroupsLive } from "./ReceiptGroups"
import { ReceiptsCompactionLive, ReceiptsLive } from "./Receipts"
import { SettingsCompactionLive, SettingsLive } from "./Settings"
import { ImagesLive } from "./Images"
import { identityRx } from "./Auth"
import { Socket } from "@effect/platform"

const EventLogLayer = EventLog.layer(ReceiptAppEvents).pipe(
  Layer.provide([ReceiptGroupsLive, ReceiptsLive, SettingsLive, ImagesLive]),
  Layer.provide(EventJournal.layerIndexedDb()),
)

const EventRemoteLive = EventLogRemote.layerWebSocket(
  "ws://localhost:3000",
).pipe(Layer.provide(EventLogLayer))

const CompactionLive = Layer.mergeAll(
  ReceiptsCompactionLive,
  SettingsCompactionLive,
).pipe(Layer.provide(EventLogLayer))

export const EventLogLive = Layer.mergeAll(
  EventLogLayer,
  EventRemoteLive,
  CompactionLive,
).pipe(
  Layer.provide([
    EventLogEncryption.layerSubtle,
    Socket.layerWebSocketConstructorGlobal,
  ]),
)

const makeClient = EventLog.makeClient(ReceiptAppEvents)

export class EventLogClient extends Context.Tag("EventLog/EventLogClient")<
  EventLogClient,
  Effect.Effect.Success<typeof makeClient>
>() {
  static Default = Layer.effect(EventLogClient, makeClient)
}

// rx

export const eventLogRx = Rx.runtime((get) =>
  Effect.gen(function* () {
    const identity = yield* get.some(identityRx)
    return EventLogLive.pipe(
      Layer.provideMerge(Layer.succeed(Identity, identity)),
    )
  }).pipe(Layer.unwrapEffect),
)

export const clientRx = eventLogRx.rx(makeClient)
export type EventClient = Rx.Rx.InferSuccess<typeof clientRx>
