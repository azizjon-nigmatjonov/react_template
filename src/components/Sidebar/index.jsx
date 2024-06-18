import styles from "./style.module.scss"
// import companyLogo from "../../assets/icons/soliq-logo.svg"
import { Collapse, Tooltip, Typography } from "@mui/material"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SettingsIcon from "@mui/icons-material/Settings"
import React, { useEffect, useMemo, useState } from "react"
import UserAvatar from "../UserAvatar"
import { NavLink, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../../store/auth/auth.slice"
import LogoutIcon from "@mui/icons-material/Logout"
import useSidebarElements from "../../hooks/useSidebarElements"
import IconGenerator from "../IconPicker/IconGenerator"

const Sidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const { elements } = useSidebarElements()

  console.log("ELEMENTS ==>", elements)

  const [rightBlockVisible, setRightBlockVisible] = useState(true)

  const selectedMenuItem = useMemo(() => {
    const activeElement = elements.find((el) => {
      if (location.pathname.includes(el.path)) return true
      return el.children?.some((child) =>
        location.pathname.includes(child.path)
      )
    })

    return activeElement
  }, [location.pathname])

  const logout = () => {
    dispatch(authActions.logout())
  }

  useEffect(() => {
    if (selectedMenuItem?.children) setRightBlockVisible(true)
  }, [selectedMenuItem])

  return (
    <div className={styles.sidebar}>
      <div className={styles.leftSide}>
        <div
          className={styles.header}
          onClick={() => setRightBlockVisible((prev) => !prev)}
        >
          {/* <img className={styles.logo} src={companyLogo} alt="soliq-logo" /> */}
        </div>

        <div className={styles.menuItemsBlock}>
          {elements.map((element) => (
            <Tooltip
              placement="right"
              followCursor
              key={element.id}
              title={element.title}
            >
              <NavLink
                key={element.id}
                to={element.path ?? element.children?.[0]?.path}
                className={`${styles.menuItem} ${
                  selectedMenuItem?.id === element.id ? styles.active : ""
                }`}
              >
                {typeof element.icon === "string" ? (
                  <IconGenerator icon={element.icon} />
                ) : (
                  <element.icon />
                )}
              </NavLink>
            </Tooltip>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.menuItem}>
            <NotificationsIcon />
          </div>

          <div className={styles.menuItem}>
            <SettingsIcon />
          </div>

          <UserAvatar disableTooltip />

          <div className={styles.menuItem} onClick={logout}>
            <LogoutIcon />
          </div>
        </div>
      </div>

      <Collapse
        in={rightBlockVisible && selectedMenuItem?.children}
        orientation="horizontal"
        unmountOnExit
      >
        <div className={styles.rightSide}>
          <div className={styles.header}>
            <Typography className={styles.title} variant="h4">
              {selectedMenuItem?.title}
            </Typography>
            <div
              className={styles.closeButton}
              onClick={() => setRightBlockVisible(false)}
            >
              <KeyboardDoubleArrowLeftIcon />
            </div>
          </div>

          <div className={styles.menuItemsBlock}>
            {selectedMenuItem?.children?.map((childMenuItem) => (
              <NavLink
                to={childMenuItem.path}
                key={childMenuItem.key}
                className={({ isActive }) =>
                  `${styles.menuItem} ${isActive ? styles.active : ""}`
                }
              >
                {childMenuItem.title}
              </NavLink>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default Sidebar
