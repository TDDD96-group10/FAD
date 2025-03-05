import React, { useEffect, useState } from "react";
/*import "../styles/pages/Home.css";*/
//import { Button } from '@mantine/core';
import { Timeline, Text , Flex} from '@mantine/core';
//import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';

const StartPage: React.FC = () => {

  return (
    
    <div className="container">
        {/* Header */}
      {/*<header className="header">
        <h1>Startsida</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#">Fadderjobb</a></li>
            <li><a href="#">Fadderöversikt</a></li>
            <li><a href="#">Dela information</a></li>
          </ul>
        </nav>
      </header>*/}
      
      {/* Main Content */}
      <main>
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        <h2>Test</h2>
          <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item title="New branch">
            <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
            <Text size="xs" mt={4}>2 hours ago</Text>
          </Timeline.Item>

          <Timeline.Item title="Commits">
            <Text c="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
            <Text size="xs" mt={4}>52 minutes ago</Text>
          </Timeline.Item>

          <Timeline.Item title="Pull request"  lineVariant="dashed">
            <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
            <Text size="xs" mt={4}>34 minutes ago</Text>
          </Timeline.Item>

          <Timeline.Item title="Code review" >
            <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
            <Text size="xs" mt={4}>12 minutes ago</Text>
          </Timeline.Item>
        </Timeline>
        </Flex>
      </main>
    </div>
  );
};

export default StartPage;
