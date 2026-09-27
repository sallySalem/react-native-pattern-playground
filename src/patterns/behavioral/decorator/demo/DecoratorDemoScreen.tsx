import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, } from 'react-native';

import { createDecoratorDemoService } from './createDecoratorDemoService';

type PipelineStep = {
  id: string;
  label: string;
  type: 'decorator' | 'component';
};

const PIPELINE: PipelineStep[] = [
  {
    id: 'analytics',
    label: 'AnalyticsDecorator',
    type: 'decorator',
  },
  {
    id: 'logging',
    label: 'LoggingDecorator',
    type: 'decorator',
  },
  {
    id: 'retry',
    label: 'RetryDecorator',
    type: 'decorator',
  },
  {
    id: 'service',
    label: 'UserApiService',
    type: 'component',
  },
];

const PipelineNode = ({
  step,
  active,
}: {
  step: PipelineStep;
  active: boolean;
}) => {
  return (
    <View style={[styles.pipelineNode, active && styles.pipelineNodeActive]}>
      <Text style={styles.pipelineType}>
        {step.type === 'decorator' ? 'DECORATOR' : 'CONCRETE COMPONENT'}
      </Text>

      <Text
        style={[styles.pipelineTitle, active && styles.pipelineTitleActive]}
      >
        {step.label}
      </Text>

      {active && <Text style={styles.executingText}>● Executing...</Text>}
    </View>
  );
};

export const DecoratorDemoScreen = () => {
  const [demo] = useState(() => createDecoratorDemoService());

  const { service, logger } = demo;

  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const [activeStep, setActiveStep] = useState<string | null>(null);

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    return logger.subscribe(messages => {
      setLogs(messages);
    });
  }, [logger]);

  const handleRun = async () => {
    if (isRunning) {
      return;
    }

    logger.clear();
    setResult(null);
    setActiveStep('analytics');
    setIsRunning(true);

    try {
      const requestPromise = service.request();

      await new Promise(resolve => setTimeout(resolve, 350));

      setActiveStep('logging');

      await new Promise(resolve => setTimeout(resolve, 350));

      setActiveStep('retry');

      const data = await requestPromise;

      setActiveStep('service');

      await new Promise(resolve => setTimeout(resolve, 500));

      setResult(data);
    } catch {
      setResult('Request failed');
    } finally {
      setActiveStep(null);
      setIsRunning(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Decorator Pattern</Text>

        <Text style={styles.subtitle}>
          Watch responsibilities being added through runtime composition.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Runtime Composition</Text>

        <Text style={styles.sectionDescription}>
          Each decorator wraps the same ApiService abstraction.
        </Text>

        {PIPELINE.map((step, index) => (
          <React.Fragment key={step.id}>
            <PipelineNode step={step} active={activeStep === step.id} />

            {index < PIPELINE.length - 1 && <Text style={styles.arrow}>↓</Text>}
          </React.Fragment>
        ))}
      </View>

      <Pressable
        onPress={handleRun}
        disabled={isRunning}
        style={[styles.runButton, isRunning && styles.runButtonDisabled]}
      >
        {isRunning ? (
          <>
            <ActivityIndicator />
            <Text style={styles.runButtonText}>Running...</Text>
          </>
        ) : (
          <Text style={styles.runButtonText}>▶ Run Request</Text>
        )}
      </Pressable>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Execution</Text>

        <View style={styles.executionPanel}>
          {logs.length === 0 ? (
            <Text style={styles.emptyText}>
              Press "Run Request" to see the decorator chain execute.
            </Text>
          ) : (
            logs.map((log, index) => (
              <View key={`${log}-${index}`} style={styles.logRow}>
                <Text style={styles.logCheck}>✓</Text>

                <Text style={styles.logText}>{log}</Text>
              </View>
            ))
          )}

          {isRunning && (
            <View style={styles.liveRow}>
              <ActivityIndicator size="small" />

              <Text style={styles.liveText}>Processing request...</Text>
            </View>
          )}
        </View>
      </View>

      {result && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>

          <View style={styles.resultCard}>
            <Text style={styles.resultIcon}>✓</Text>

            <View style={styles.resultContent}>
              <Text style={styles.resultLabel}>Request completed</Text>

              <Text style={styles.resultText}>{result}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },

  header: {
    gap: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 23,
  },

  section: {
    gap: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },

  pipelineNode: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    gap: 5,
  },

  pipelineNodeActive: {
    borderWidth: 2,
  },

  pipelineType: {
    fontSize: 11,
    fontWeight: '700',
  },

  pipelineTitle: {
    fontSize: 17,
    fontWeight: '600',
  },

  pipelineTitleActive: {
    fontWeight: '800',
  },

  executingText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
  },

  arrow: {
    fontSize: 24,
    textAlign: 'center',
  },

  runButton: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  runButtonDisabled: {
    opacity: 0.6,
  },

  runButtonText: {
    fontSize: 17,
    fontWeight: '700',
  },

  executionPanel: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    minHeight: 120,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 20,
  },

  logRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },

  logCheck: {
    fontSize: 15,
    fontWeight: '700',
  },

  logText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },

  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  liveText: {
    fontSize: 14,
    fontWeight: '600',
  },

  resultCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  resultIcon: {
    fontSize: 20,
    fontWeight: '700',
  },

  resultContent: {
    flex: 1,
    gap: 4,
  },

  resultLabel: {
    fontSize: 13,
    fontWeight: '600',
  },

  resultText: {
    fontSize: 17,
    fontWeight: '700',
  },
});
