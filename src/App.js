import React from "react";
import "./styles.css";
import { Global } from "@emotion/core";
import styled from "@emotion/styled";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";

// State

const playerStatus = atom({
  key: "playerStatus",
  default: "paused"
});
const selectedSongID = atom({
  key: "song",
  default: null
});

const selectedChannel = atom({
  key: "selectedChannel",
  default: null
});

const currentSong = atom({
  key: "currentSong",
  default: null
});

const nextUpSongs = atom({
  key: "nextUpSongs",
  default: [5, 3, 6]
});

const songs = [
  { title: "Utopia", singer: "Austra", duration: "3:39" },
  { title: "Utopia", singer: "Yacht", duration: "3:12" },
  { title: "Blowin' in the wind", singer: "Bob Dylan", duration: "4:39" },
  { title: "Papaya", singer: "Tennis", duration: "2:29" },
  { title: "One of Two", singer: "Breakbot", duration: "13:39" },
  { title: "You've got me", singer: "Yung Bae", duration: "3:05" },
  { title: "Best Of You", singer: "Get To Know", duration: "3:15" },
  { title: "Raphael Futura", singer: "Riviera", duration: "3:02" }
];

const channelList = atom({
  key: "channelList",
  default: [
    "Utopia FM (default)",
    "Indie Summer",
    "Hangover Club",
    "Tokyo Disco",
    "Friday Nite Heat"
  ]
});

const Header = styled.div({
  display: "flex",
  height: 12,
  alignItems: "center"
});

const ChannelSelector = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const channels = useRecoilValue(channelList);
  const [channel, setChannel] = useRecoilState(selectedChannel);

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          marginLeft: 12,
          marginRight: 12,
          height: 30,
          display: "flex",
          alignItems: "center",
          cursor: "pointer"
        }}
      >
        Channel:
        <span style={{ fontSize: 10, marginLeft: 4, flexGrow: 1 }}>
          {channel}
        </span>
        <Button style={{ border: "none" }}>⌄</Button>
      </div>
      <div
        style={{
          boxShadow: "inset 0px 0px 0px 1px",
          backgroundColor: "white",
          height: !expanded ? "1px " : null,
          overflow: "hidden"
        }}
      >
        {!expanded
          ? "nope"
          : channels.map((x) => (
              <div
                onClick={() => {
                  setExpanded(false);
                  setChannel(x);
                }}
                data-label="row"
                style={{
                  fontSize: 10,
                  padding: 8,
                  borderBottom: "1px dotted black",
                  cursor: "pointer"
                }}
              >
                {x}
              </div>
            ))}
      </div>
    </div>
  );
};

const Timer = (props) => (
  <span style={{}}>
    {props.time} / {props.duration}
  </span>
);

const AppContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: 280,
  height: 200,
  padding: 4,
  boxShadow: "0px 0px 0px 0.5px rgba(0,0,0,.7)",
  backgroundColor: "#FFF6D9",
  overflow: "hidden"
});

const ButtonGroup = styled.div({
  display: "flex",
  "& > *": {
    width: 40,
    borderRight: "0px solid transparent"
  },
  "& > *:first-child": {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  "& > *:last-child": {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderRight: "1px solid black"
  }
});

const Button = styled.button(
  {
    border: "1px solid black",
    outline: "0px transparent",
    "&:focus": { outline: "0px transparent" },
    cursor: "pointer",
    "&:active": {
      background: "black",
      color: "#FFF6D9",
      outline: "0px transparent"
    }
  },
  (props) => ({
    width: props.small ? 12 : null,
    height: props.small ? 12 : null,
    fontSize: props.small ? 8 : null,
    marginLeft: props.small ? 2 : null,
    marginRight: props.small ? 2 : null
  })
);

const Line = styled.div({
  height: "1px",
  width: "100%",
  boxShadow: "inset 0px 0px 0px 1px black"
});

const SongDeets = (props) => (
  <div>
    {props.song.singer}
    <br />
    {props.song.title}
  </div>
);

export default function App() {
  const [playing, setPlaying] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(false);

  const calculateTimeLeft = (timeLeft, playing) => {
    if (playing) {
    }

    return timeLeft + 1;
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(timeLeft));
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const [timeLeft, setTimeLeft] = React.useState(0);

  const handleChannelChange = (targetChannel) => {
    setCurrentSong("random");
    setPlaying(true);
  };

  return (
    <RecoilRoot>
      <div style={{ fontFamily: "Krungthep", fontSize: 12, fontWeight: 300 }}>
        <AppContainer>
          <Header>
            <Button small>♽</Button>
            <Button small>⏁</Button>
            <Button small>⍜</Button>
            <div
              style={{
                height: 12,
                fontSize: 8,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around"
              }}
            >
              <Line />
              <Line />
              <Line />
              <Line />
              <Line />
              <Line />
            </div>
            <span style={{ marginLeft: 8, marginRight: 4 }}>Utopia FM </span>
          </Header>
          <div
            style={{
              display: "flex",
              height: 26,
              marginTop: 4,
              backgroundColor: "black"
            }}
          />

          <ChannelSelector />
          <div
            style={{
              height: 27,
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
              paddingRight: 8
            }}
          >
            <Timer time={"1:39"} duration={30} />
            <span>{timeLeft}</span>
          </div>
          <div
            style={{
              height: 27,
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
              paddingRight: 8
            }}
          >
            <SongDeets song={playing} />
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
              paddingRight: 8
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ButtonGroup>
                <Button onClick={() => setPlaying(false)}>⏮</Button>

                <Button onClick={() => setPlaying(!playing)}>
                  {playing ? "⏸" : "▶️"}
                </Button>
                <Button>⏭</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button>♡</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button>⎙</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button>📲</Button>
              </ButtonGroup>
            </div>
          </div>
        </AppContainer>
      </div>
    </RecoilRoot>
  );
}
