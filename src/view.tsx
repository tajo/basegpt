import { useView, Compiler, Error } from "react-view";
import { useState, useEffect } from "react";
import { styled } from "baseui";
import presetTypescript from "@babel/preset-typescript";
import Editor from "./editor";

const TYPE = {};

import { Accordion, Panel } from "baseui/accordion";
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { Avatar } from "baseui/avatar";
import { Badge, HIERARCHY, SHAPE, COLOR, PLACEMENT } from "baseui/badge";
import { Banner, ACTION_POSITION, ARTWORK_TYPE } from "baseui/banner";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { ButtonGroup, MODE } from "baseui/button-group";
import { ButtonTimed } from "baseui/button-timed";
import { Button, KIND, SIZE } from "baseui/button";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";
import { Combobox } from "baseui/combobox";
import { DatePicker } from "baseui/datepicker";
import { StyledDivider } from "baseui/divider";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
import { Drawer, ANCHOR } from "baseui/drawer";
import { FileUploader } from "baseui/file-uploader";
import {
  FixedMarker,
  PINHEAD_SIZES_SHAPES,
  NEEDLE_SIZES,
  BADGE_ENHANCER_SIZES,
  LABEL_ENHANCER_POSITIONS,
} from "baseui/map-marker";
import { FormControl } from "baseui/form-control";
import {
  HeaderNavigation,
  StyledNavigationItem,
  StyledNavigationList,
} from "baseui/header-navigation";
import { HintDot } from "baseui/badge";
import { ArrowUp } from "baseui/icon";
import { Input, ADJOINED } from "baseui/input";
import { StyledLink } from "baseui/link";
import { ListHeading } from "baseui/list";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { StatefulMenu } from "baseui/menu";
import {
  MessageCard,
  BACKGROUND_COLOR_TYPE,
  IMAGE_LAYOUT,
} from "baseui/message-card";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE,
} from "baseui/modal";
import { NotificationCircle } from "baseui/badge";
import { Skeleton } from "baseui/skeleton";
import { Notification } from "baseui/notification";
import { Pagination } from "baseui/pagination";
import { PaymentCard } from "baseui/payment-card";
import { PhoneInput, COUNTRIES } from "baseui/phone-input";
import { TableBuilder } from "baseui/table-semantic";
import {
  Table,
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledRow,
  StyledCell,
} from "baseui/table";
import { PinCode } from "baseui/pin-code";
import { StatefulPopover } from "baseui/popover";
import { ProgressBar } from "baseui/progress-bar";
import { ProgressSteps, NumberedStep, Step } from "baseui/progress-steps";
import { Radio, RadioGroup, ALIGN } from "baseui/radio";
import { StarRating } from "baseui/rating";
import { Select } from "baseui/select";
import { Navigation } from "baseui/side-navigation";
import { Slider } from "baseui/slider";
import { Spinner } from "baseui/spinner";
import { Tabs, Tab, ORIENTATION, FILL } from "baseui/tabs-motion";
import { Tag, VARIANT } from "baseui/tag";
import { TimePicker } from "baseui/timepicker";
import { TimezonePicker } from "baseui/timezonepicker";
import { toaster, ToasterContainer } from "baseui/toast";
import {
  StatefulTooltip,
  ACCESSIBILITY_TYPE,
  TRIGGER_TYPE,
} from "baseui/tooltip";
import { TreeView, toggleIsExpanded } from "baseui/tree-view";

function View({ initialCode }) {
  const params = useView({
    initialCode,
    scope: {
      useEffect,
      useState,
      styled,
      Accordion,
      Panel,
      AppNavBar,
      setItemActive,
      Avatar,
      Badge,
      HIERARCHY,
      SHAPE,
      COLOR,
      PLACEMENT,
      Banner,
      ACTION_POSITION,
      ARTWORK_TYPE,
      Breadcrumbs,
      ButtonGroup,
      MODE,
      ButtonTimed,
      Button,
      KIND,
      SIZE,
      Card,
      StyledBody,
      StyledAction,
      Checkbox,
      STYLE_TYPE,
      LABEL_PLACEMENT,
      Combobox,
      DatePicker,
      StyledDivider,
      List,
      arrayMove,
      arrayRemove,
      Drawer,
      ANCHOR,
      FileUploader,
      FixedMarker,
      PINHEAD_SIZES_SHAPES,
      NEEDLE_SIZES,
      BADGE_ENHANCER_SIZES,
      LABEL_ENHANCER_POSITIONS,
      FormControl,
      HeaderNavigation,
      StyledNavigationItem,
      StyledNavigationList,
      Table,
      StyledTable,
      StyledHead,
      StyledHeadCell,
      StyledRow,
      StyledCell,
      HintDot,
      ArrowUp,
      Input,
      ADJOINED,
      StyledLink,
      ListHeading,
      ListItem,
      ListItemLabel,
      ARTWORK_SIZES,
      StatefulMenu,
      MessageCard,
      BACKGROUND_COLOR_TYPE,
      IMAGE_LAYOUT,
      TYPE,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      ModalButton,
      ROLE,
      NotificationCircle,
      Skeleton,
      Notification,
      Pagination,
      PaymentCard,
      PhoneInput,
      COUNTRIES,
      PinCode,
      StatefulPopover,
      ProgressBar,
      ProgressSteps,
      NumberedStep,
      Step,
      Radio,
      RadioGroup,
      ALIGN,
      StarRating,
      Select,
      Navigation,
      Slider,
      TableBuilder,
      Spinner,
      Tabs,
      Tab,
      ORIENTATION,
      FILL,
      Tag,
      VARIANT,
      TimePicker,
      TimezonePicker,
      toaster,
      ToasterContainer,
      StatefulTooltip,
      ACCESSIBILITY_TYPE,
      TRIGGER_TYPE,
      TreeView,
      toggleIsExpanded,
    },
  });
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        paddingTop: "2rem",
      }}
    >
      <div
        style={{
          flex: "1",
          maxWidth: 515,
          paddingRight: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Editor {...params.editorProps} language="tsx" />
        <Error {...params.errorProps} />
      </div>
      <div
        style={{
          flex: "1",
          paddingLeft: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Compiler {...params.compilerProps} presets={[presetTypescript]} />
      </div>
    </div>
  );
}

export default View;
