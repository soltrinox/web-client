import { FILTER_TYPE } from "../../../helpers/filtering.helpers";
import {
  ComposedRequestEventTypeValue,
  EVENT_TYPE_FILTER_DEFAULT_VALUE,
  EVENT_TYPE_FILTER_NAME,
  EventTypeFilterType
} from "./event-type-filter.constants";
import { IComposeDefaultFilter } from "../../table.types";

export const composeDefaultEventTypeFilter = (): IComposeDefaultFilter => ({
  name: EVENT_TYPE_FILTER_NAME,
  composeRequestValue: (
    value: EventTypeFilterType
  ): ComposedRequestEventTypeValue => value,
  defaultValue: EVENT_TYPE_FILTER_DEFAULT_VALUE,
  type: FILTER_TYPE.GENERAL
});
