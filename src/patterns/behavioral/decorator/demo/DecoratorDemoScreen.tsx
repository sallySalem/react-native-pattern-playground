import React, { useState } from 'react';

import { ActivityIndicator, Pressable, StyleSheet, Text, View, } from 'react-native';

import { createDecoratorDemoService } from './createDecoratorDemoService';

import { DemoScenario } from './DemoApiService';

import { playExecution } from './playExecution';

type PipelineStep = 'analytics' | 'logging' | 'retry' | 'user-api';

const DEMO_DELAY = 1000;

const getStepFromMessage = (message: string): PipelineStep | null => {
  if (message.startsWith('Analytics')) {
    return 'analytics';
  }

  if (message.startsWith('Logging')) {
    return 'logging';
  }

  if (message.startsWith('Retry')) {
    return 'retry';
  }

  if (message.startsWith('User API')) {
    return 'user-api';
  }

  return null;
};

const PipelineItem = ({
  label,
  active = false,
  component = false,
}: {
  label: string;
  active?: boolean;
  component?: boolean;
}) => (
  <View
    style={[
      styles.pipelineItem,
      component && styles.componentItem,
      active && styles.pipelineItemActive,
    ]}
  >
    <View style={styles.pipelineContent}>
      {active && <ActivityIndicator size="small" />}

      <Text style={[styles.pipelineText, active && styles.pipelineTextActive]}>
        {label}
      </Text>
    </View>
  </View>
);

const Arrow = () => <Text style={styles.arrow}>→</Text>;

const ScenarioButton = ({
  label,
  scenario,
  selectedScenario,
  disabled,
  onPress,
}: {
  label: string;
  scenario: DemoScenario;
  selectedScenario: DemoScenario;
  disabled: boolean;
  onPress: () => void;
}) => {
  const selected = scenario === selectedScenario;

  return (
    <Pressable
      style={styles.scenarioButton}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.radio, selected && styles.radioActive]} />

      <Text
        style={[styles.scenarioText, selected && styles.scenarioTextActive]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export const DecoratorDemoScreen = () => {
  const [scenario, setScenario] = useState<DemoScenario>('success-second');

  const [activeStep, setActiveStep] = useState<PipelineStep | null>(null);

  const [logs, setLogs] = useState<string[]>([]);

  const [isRunning, setIsRunning] = useState(false);

  const [result, setResult] = useState<string | null>(null);

  const handleRun = async () => {
    if (isRunning) {
      return;
    }

    setLogs([]);
    setActiveStep(null);
    setResult(null);
    setIsRunning(true);

    const demo = createDecoratorDemoService(scenario);

    try {
      const data = await demo.service.request();

      const messages = demo.logger.getMessages();

      await playExecution(messages, DEMO_DELAY, message => {
        const currentStep = getStepFromMessage(message);

        if (!currentStep) {
          return;
        }

        setLogs(previous => [...previous, message]);

        setActiveStep(currentStep);
      });

      setResult(data);
    } catch {
      const messages = demo.logger.getMessages();

      await playExecution(messages, DEMO_DELAY, message => {
        const currentStep = getStepFromMessage(message);

        if (!currentStep) {
          return;
        }

        setLogs(previous => [...previous, message]);

        setActiveStep(currentStep);
      });

      setResult('Request failed');
    } finally {
      setActiveStep(null);
      setIsRunning(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Decorator Pattern</Text>

      <Text style={styles.subtitle}>
        Follow the request through the decorator chain.
      </Text>

      <View style={styles.pipeline}>
        <PipelineItem label="Analytics" active={activeStep === 'analytics'} />

        <Arrow />

        <PipelineItem label="Logging" active={activeStep === 'logging'} />

        <Arrow />

        <PipelineItem label="Retry" active={activeStep === 'retry'} />

        <Arrow />

        <PipelineItem
          label="User API"
          component
          active={activeStep === 'user-api'}
        />
      </View>

      <Text style={styles.sectionTitle}>Request scenario</Text>

      <View style={styles.scenarioRow}>
        <ScenarioButton
          label="Success"
          scenario="success-first"
          selectedScenario={scenario}
          disabled={isRunning}
          onPress={() => setScenario('success-first')}
        />

        <ScenarioButton
          label="Retry → Success"
          scenario="success-second"
          selectedScenario={scenario}
          disabled={isRunning}
          onPress={() => setScenario('success-second')}
        />

        <ScenarioButton
          label="Retry → Fail"
          scenario="fail-second"
          selectedScenario={scenario}
          disabled={isRunning}
          onPress={() => setScenario('fail-second')}
        />
      </View>

      <Pressable
        style={[styles.runButton, isRunning && styles.runButtonDisabled]}
        onPress={handleRun}
        disabled={isRunning}
      >
        <Text style={styles.runButtonText}>
          {isRunning ? 'Running...' : '▶  Run Request'}
        </Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Live Execution</Text>

      <View style={styles.execution}>
        {logs.length === 0 ? (
          <Text style={styles.emptyText}>
            Run the request to see the execution flow.
          </Text>
        ) : (
          logs.map((message, index) => (
            <View key={`${message}-${index}`} style={styles.logRow}>
              <Text style={styles.stepNumber}>{index + 1}</Text>

              <Text
                style={[
                  styles.logText,
                  index === logs.length - 1 && styles.currentLog,
                ]}
              >
                {message}
              </Text>
            </View>
          ))
        )}
      </View>

      {result && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Result</Text>

          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
  },

  pipeline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  pipelineItem: {
    flex: 1,
    minHeight: 42,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  componentItem: {
    borderStyle: 'dashed',
  },

  pipelineItemActive: {
    borderWidth: 2,
    backgroundColor: '#E8F0FE',
  },

  pipelineContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  pipelineText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },

  pipelineTextActive: {
    fontWeight: '800',
  },

  arrow: {
    fontSize: 15,
    marginHorizontal: 2,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },

  scenarioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 7,
  },

  scenarioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 4,
    paddingVertical: 3,
  },

  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 5,
  },

  radioActive: {
    backgroundColor: '#222222',
    borderWidth: 4,
  },

  scenarioText: {
    fontSize: 11,
    color: '#555555',
  },

  scenarioTextActive: {
    fontWeight: '700',
    color: '#222222',
  },

  runButton: {
    minHeight: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
  },

  runButtonDisabled: {
    opacity: 0.5,
  },

  runButtonText: {
    fontSize: 13,
    fontWeight: '800',
  },

  execution: {
    minHeight: 150,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 8,
  },

  emptyText: {
    color: '#888888',
    fontSize: 12,
    lineHeight: 17,
  },

  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  stepNumber: {
    width: 20,
    fontSize: 11,
    fontWeight: '700',
    color: '#888888',
  },

  logText: {
    flex: 1,
    fontSize: 12,
    color: '#444444',
  },

  currentLog: {
    fontWeight: '800',
  },

  result: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },

  resultLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },

  resultText: {
    fontSize: 12,
  },
});
