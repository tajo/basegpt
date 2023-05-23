import { useView, Compiler, Error } from "react-view";
import { useState, useEffect } from "react";
import presetTypescript from "@babel/preset-typescript";
import Editor from "./editor";

import * as rootDefault from "baseui";
import * as a11yDefault from "baseui/a11y";
import * as buttonGroupDefault from "baseui/button-group";
import * as headerNavigationDefault from "baseui/header-navigation";
import * as phoneInputDefault from "baseui/phone-input";
import * as spinnerDefault from "baseui/spinner";
import * as accordionDefault from "baseui/accordion";
import * as buttonTimedDefault from "baseui/button-timed";
import * as headingDefault from "baseui/heading";
import * as mapMarkerDefault from "baseui/map-marker";
import * as pinCodeDefault from "baseui/pin-code";
import * as appNavBarDefault from "baseui/app-nav-bar";
import * as cardDefault from "baseui/card";
import * as helperDefault from "baseui/helper";
import * as menuDefault from "baseui/menu";
import * as popoverDefault from "baseui/popover";
import * as stylesDefault from "baseui/styles";
import * as themesDefault from "baseui/themes";
import * as aspectRatioBoxDefault from "baseui/aspect-ratio-box";
import * as checkboxDefault from "baseui/checkbox";
import * as messageCardDefault from "baseui/message-card";
import * as progressBarDefault from "baseui/progress-bar";
import * as timepickerDefault from "baseui/timepicker";
import * as avatarDefault from "baseui/avatar";
import * as comboboxDefault from "baseui/combobox";
import * as iconDefault from "baseui/icon";
import * as progressStepsDefault from "baseui/progress-steps";
import * as tableDefault from "baseui/table";
import * as tableGridDefault from "baseui/table-grid";
import * as toastDefault from "baseui/toast";
import * as badgeDefault from "baseui/badge";
import * as dataTableDefault from "baseui/data-table";
import * as modalDefault from "baseui/modal";
import * as ratingDefault from "baseui/rating";
import * as tableSemanticDefault from "baseui/table-semantic";
import * as tokensDefault from "baseui/tokens";
import * as blockDefault from "baseui/block";
import * as dividerDefault from "baseui/divider";
import * as inputDefault from "baseui/input";
import * as notificationDefault from "baseui/notification";
import * as selectDefault from "baseui/select";
import * as tabsDefault from "baseui/tabs";
import * as tooltipDefault from "baseui/tooltip";
import * as dndListDefault from "baseui/dnd-list";
import * as layerDefault from "baseui/layer";
import * as tabsMotionDefault from "baseui/tabs-motion";
import * as treeViewDefault from "baseui/tree-view";
import * as breadcrumbsDefault from "baseui/breadcrumbs";
import * as drawerDefault from "baseui/drawer";
import * as sideNavigationDefault from "baseui/side-navigation";
import * as tagDefault from "baseui/tag";
import * as buttonDefault from "baseui/button";
import * as fileUploaderDefault from "baseui/file-uploader";
import * as layoutGridDefault from "baseui/layout-grid";
import * as skeletonDefault from "baseui/skeleton";
import * as typographyDefault from "baseui/typography";
import * as flexGridDefault from "baseui/flex-grid";
import * as linkDefault from "baseui/link";
import * as paginationDefault from "baseui/pagination";
import * as sliderDefault from "baseui/slider";
import * as formControlDefault from "baseui/form-control";
import * as listDefault from "baseui/list";
import * as paymentCardDefault from "baseui/payment-card";
import * as snackbarDefault from "baseui/snackbar";
import * as textareaDefault from "baseui/textarea";

const scope = {
  useEffect,
  useState,
  ...rootDefault,
  ...a11yDefault,
  ...buttonGroupDefault,
  ...headerNavigationDefault,
  ...phoneInputDefault,
  ...spinnerDefault,
  ...accordionDefault,
  ...buttonTimedDefault,
  ...headingDefault,
  ...mapMarkerDefault,
  ...pinCodeDefault,
  ...appNavBarDefault,
  ...cardDefault,
  ...helperDefault,
  ...menuDefault,
  ...popoverDefault,
  ...stylesDefault,
  ...themesDefault,
  ...aspectRatioBoxDefault,
  ...checkboxDefault,
  ...messageCardDefault,
  ...progressBarDefault,
  ...timepickerDefault,
  ...avatarDefault,
  ...comboboxDefault,
  ...iconDefault,
  ...progressStepsDefault,
  ...tableDefault,
  ...tableGridDefault,
  ...toastDefault,
  ...badgeDefault,
  ...dataTableDefault,
  ...modalDefault,
  ...ratingDefault,
  ...tableSemanticDefault,
  ...tokensDefault,
  ...blockDefault,
  ...dividerDefault,
  ...inputDefault,
  ...notificationDefault,
  ...selectDefault,
  ...tabsDefault,
  ...tooltipDefault,
  ...dndListDefault,
  ...layerDefault,
  ...tabsMotionDefault,
  ...treeViewDefault,
  ...breadcrumbsDefault,
  ...drawerDefault,
  ...sideNavigationDefault,
  ...tagDefault,
  ...buttonDefault,
  ...fileUploaderDefault,
  ...layoutGridDefault,
  ...skeletonDefault,
  ...typographyDefault,
  ...flexGridDefault,
  ...linkDefault,
  ...paginationDefault,
  ...sliderDefault,
  ...formControlDefault,
  ...listDefault,
  ...paymentCardDefault,
  ...snackbarDefault,
  ...textareaDefault,
};

console.log(scope);

function View({ initialCode }) {
  const params = useView({
    initialCode,
    scope,
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
