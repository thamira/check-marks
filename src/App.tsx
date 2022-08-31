import React, { BaseSyntheticEvent, useEffect } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectedAll: {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)"
      }
    }
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const columnsData = [
  {
    value: "option_1",
    label: "Option 1"
  },
  {
    value: "option_2",
    label: "Option 2"
  },
  {
    value: "option_3",
    label: "Option 3"
  },
  {
    value: "option_4",
    label: "Option 4"
  }
];

export default function MultipleSelect() {
  const classes = useStyles();
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>([]);

  const isAllSelected =
    columnsData.length > 0 && visibleColumns.length === columnsData.length;

  const handleChange = (event: BaseSyntheticEvent) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setVisibleColumns(
        visibleColumns.length === columnsData.length
          ? []
          : columnsData.map((data) => data.value)
      );
      return;
    }
    setVisibleColumns(value);
  };

  const renderValue = (selected: unknown) => {
    if (typeof selected === "object" && selected !== null) {
      return `Выборка: ${Object.entries(selected).length}`;
    }
    return false;
  };

  useEffect(() => {
    console.log(visibleColumns);
  }, [visibleColumns]);

  useEffect(() => {
    setVisibleColumns(["option 2", "option 3"]);
  }, []);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="mutiple-checkbox-label">Выборка</InputLabel>

        <TextField
          classes={{ root: classes.root }}
          select
          name="userRoles"
          id="userRoles"
          variant="outlined"
          label="userRoles"
          SelectProps={{
            multiple: true,
            value: visibleColumns,
            onChange: handleChange,
            MenuProps: MenuProps,
            renderValue: renderValue,
            MenuProps: {
              anchorOrigin: { vertical: "bottom", horizontal: "left" },
              transformOrigin: { vertical: "top", horizontal: "left" },
              getContentAnchorEl: null
            }
          }}
        >
          <MenuItem
            value="all"
            classes={{
              root: isAllSelected ? classes.selectedAll : ""
            }}
          >
            <Checkbox checked={isAllSelected} />
            <ListItemText primary={"Все"} />
          </MenuItem>

          {columnsData.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={visibleColumns.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </div>
  );
}
