import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.push("/(auth)/sign-in");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-general-100">
      <SignedIn>
        <View className=" bg-general-100">
          <Text className="text-3xl font-bold my-5">
            Hello {"\n"} {user?.emailAddresses[0].emailAddress}
          </Text>
          <View>
            <CustomButton
              className="text-center"
              title="Sign Out"
              onPress={handleSignOut}
            />
          </View>
        </View>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  );
}
