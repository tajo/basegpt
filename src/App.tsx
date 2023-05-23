import * as React from "react";
import { Textarea } from "baseui/textarea";
import { useView, Compiler, Error } from "react-view";
import presetTypescript from "@babel/preset-typescript";
import { Heading, HeadingLevel } from "baseui/heading";
import Editor from "./editor";

const TYPE = {};

import { Accordion, Panel } from "baseui/accordion";
import {
  AppNavBar,
  setItemActive,
} from "baseui/app-nav-bar";
import { Avatar } from "baseui/avatar";
import {
  Badge,
  HIERARCHY,
  SHAPE,
  COLOR,
  PLACEMENT,
} from "baseui/badge";
import {
  Banner,
  ACTION_POSITION,
  ARTWORK_TYPE,
} from "baseui/banner";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { ButtonGroup, MODE } from "baseui/button-group";
import { ButtonTimed } from "baseui/button-timed";
import { Button, KIND, SIZE } from "baseui/button";
import {
  Card,
  StyledBody,
  StyledAction,
} from "baseui/card";
import {
  Checkbox,
  STYLE_TYPE,
  LABEL_PLACEMENT,
} from "baseui/checkbox";
import { Combobox } from "baseui/combobox";
import { DatePicker } from "baseui/datepicker";
import { StyledDivider } from "baseui/divider";
import {
  List,
  arrayMove,
  arrayRemove,
} from "baseui/dnd-list";
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
import {
  ListItem,
  ListItemLabel,
  ARTWORK_SIZES,
} from "baseui/list";
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
import { PinCode } from "baseui/pin-code";
import { StatefulPopover } from "baseui/popover";
import { ProgressBar } from "baseui/progress-bar";
import {
  ProgressSteps,
  NumberedStep,
  Step,
} from "baseui/progress-steps";
import { Radio, RadioGroup, ALIGN } from "baseui/radio";
import { StarRating } from "baseui/rating";
import { Select } from "baseui/select";
import { Navigation } from "baseui/side-navigation";
import { Slider } from "baseui/slider";
import { Spinner } from "baseui/spinner";
import {
  Tabs,
  Tab,
  ORIENTATION,
  FILL,
} from "baseui/tabs-motion";
import { Tag, VARIANT } from "baseui/tag";
import { TimePicker } from "baseui/timepicker";
import { TimezonePicker } from "baseui/timezonepicker";
import { toaster, ToasterContainer } from "baseui/toast";
import {
  StatefulTooltip,
  ACCESSIBILITY_TYPE,
  TRIGGER_TYPE,
} from "baseui/tooltip";
import {
  TreeView,
  toggleIsExpanded,
} from "baseui/tree-view";

import "./App.css";

function App() {
  const [value, setValue] = React.useState(
    "Use BaseWeb to implement a slider that has marks and 20 steps."
  );
  const params = useView({
    initialCode: `import { Slider } from 'baseui/slider';

export default () => {
  const [value, setValue] = React.useState([10]);
  return (
    <Slider
      value={value}
      onChange={({ value }) => setValue(value)}
      onFinalChange={({ value }) => console.log(value)}
      min={0}
      max={20}
      step={1}
      marks={Array.from({length: 21}, (_, i) => i)}
    />
  );
}
`,
    scope: {
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
    onUpdate: console.log,
  });
  return (
    <HeadingLevel>
      <Heading styleLevel={5} $style={{ marginTop: 0 }}>
        BaseGPT
      </Heading>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Describe the user interface you want to build..."
        clearOnEscape
        overrides={{
          InputContainer: {
            style: () => ({
              height: "70px",
            }),
          },
        }}
      />
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
          <Compiler
            {...params.compilerProps}
            presets={[presetTypescript]}
          />
        </div>
      </div>
    </HeadingLevel>
  );
}

export default App;
