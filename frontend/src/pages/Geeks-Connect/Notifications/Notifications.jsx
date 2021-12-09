import React from "react";
import "./Notifications.scss";
import { useSelector } from "react-redux";

export default function Notifications() {
    const newNotification = useSelector((state) => state.newNotification);

    return (
        <div
            class="notification_dd"
            style={{
                position: "fixed",
            }}
        >
            <ul class="notification_ul">
                {newNotification !== undefined || newNotification !== null
                    ? newNotification.map((notification) => (
                          <li class="success">
                              <div
                                  class="notify_icon"
                                  style={{
                                      background: `url(${notification.image}) no-repeat`,
                                      backgroundSize: "cover",
                                  }}
                              >
                                  <span class="icon"></span>
                              </div>
                              <div class="notify_data">
                                  <div class="title">
                                      <span>{notification.title}</span>
                                  </div>
                                  <div class="sub_title">
                                      {notification.message}
                                  </div>
                              </div>
                              <div class="notify_status">
                                  <p>{notification.type}</p>
                              </div>
                          </li>
                      ))
                    : null}
                <li class="show_all">
                    <p class="link">Show All Activities</p>
                </li>
            </ul>
        </div>
    );
}
