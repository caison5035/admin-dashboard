import { View, Text, Pressable, ScrollView, Image, Alert } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { TabHeader } from '@/components/tab-header';
import { useRouter } from 'expo-router';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import { useOAuth } from '@/lib/oauth-context';
import { BobsReconciliationCard } from '@/components/bobs-reconciliation-card';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  route?: string;
  comingSoon?: boolean;
}

const FEATURES: Feature[] = [
  {
    id: 'track',
    icon: '📊',
    title: 'Weekly Tracker',
    description: 'Add weekly expenses with a calculator-style interface',
    route: '/(tabs)/weekly-tracker',
  },
  {
    id: 'bob',
    icon: '🤖',
    title: 'Bob AI Assistant',
    description: 'Get personalized financial guidance from Bob',
    comingSoon: true,
  },
  {
    id: 'swot',
    icon: '🎯',
    title: 'SWOT Analysis',
    description: 'Analyze your financial strengths and opportunities',
    comingSoon: true,
  },
  {
    id: 'bank',
    icon: '🏦',
    title: 'Bank Integration',
    description: 'Connect your bank account for auto-tracking',
    comingSoon: true,
  },
  {
    id: 'reports',
    icon: '📈',
    title: 'Smart Reports',
    description: 'Get detailed insights into your spending patterns',
    route: '/(tabs)/financial-analysis',
  },
  {
    id: 'goals',
    icon: '🎁',
    title: 'Goal Tracking',
    description: 'Set and track financial goals with progress',
    route: '/(tabs)/goals',
  },
  {
    id: 'loan',
    icon: '💰',
    title: 'Loan Calculator',
    description: 'Calculate loan payments and interest',
    comingSoon: true,
  },
  {
    id: 'calendar',
    icon: '📅',
    title: 'Calendar Sync',
    description: 'Auto-sync bills to Apple or Google Calendar',
    comingSoon: true,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { logout, user } = useAuth();
  const { user: oauthUser } = useOAuth();

  const handleFeaturePress = async (feature: Feature) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (feature.comingSoon) {
      Alert.alert('Coming Soon', `${feature.title} will be available soon!`);
      return;
    }

    if (feature.route) {
      router.push(feature.route as any);
    }
  };

  const handleLogout = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await logout();
  };

  const handleLogin = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/login');
  };

  return (
    <ScreenContainer className="p-0" containerClassName="bg-gradient-to-b from-primary/10 to-background">
      <TabHeader title="Home" showBackButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 20, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-8 pb-8">
          {/* User Profile Section */}
          {user && oauthUser && (
            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center gap-3 mx-2">
              {oauthUser.picture && (
                <Image
                  source={{ uri: oauthUser.picture }}
                  style={{ width: 48, height: 48, borderRadius: 24 }}
                />
              )}
              <View className="flex-1">
                <Text className="text-sm font-semibold text-muted">Logged in as</Text>
                <Text className="text-base font-bold text-foreground">{oauthUser.name}</Text>
                <Text className="text-xs text-muted">{oauthUser.email}</Text>
              </View>
            </View>
          )}

          {/* Header with Aveni Branding */}
          <View className="gap-1 items-center px-4 pt-4">
            <Text className="text-5xl font-black text-center" style={{ color: '#39FF14' }}>
              Aveni
            </Text>
            <Text className="text-2xl font-bold text-center" style={{ color: '#FF1493' }}>
              Cash-flow Autopilot
            </Text>
            <Text className="text-base text-muted text-center mt-2">
              Take control of your biweekly finances
            </Text>
          </View>

          {/* Bob's Reconciliation Card */}
          <View className="px-2">
            <BobsReconciliationCard />
          </View>

          {/* Features Grid */}
          <View className="gap-3 px-2">
            {FEATURES.map((feature) => (
              <Pressable
                key={feature.id}
                onPress={() => handleFeaturePress(feature)}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.surface,
                    borderColor: feature.comingSoon ? colors.border : colors.border,
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 16,
                    gap: 8,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    opacity: feature.comingSoon ? 0.6 : (pressed ? 0.8 : 1),
                  },
                ]}
              >
                <View className="flex-row gap-3 items-start justify-between">
                  <View className="flex-row gap-3 items-start flex-1">
                    <Text className="text-2xl">{feature.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{feature.title}</Text>
                      <Text className="text-xs text-muted leading-tight">{feature.description}</Text>
                    </View>
                  </View>
                  {feature.comingSoon && (
                    <Text className="text-xs font-semibold text-warning bg-warning/20 px-2 py-1 rounded">
                      Soon
                    </Text>
                  )}
                </View>
              </Pressable>
            ))}
          </View>

          {/* Login/Logout Button */}
          <View className="gap-3 px-4 mt-4">
            <Pressable
              onPress={user ? handleLogout : handleLogin}
              style={({ pressed }) => [
                {
                  backgroundColor: user ? colors.error : colors.primary,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text className="text-base font-semibold text-white">
                {user ? 'Logout' : 'Login'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
