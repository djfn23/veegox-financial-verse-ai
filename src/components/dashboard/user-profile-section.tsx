
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/hooks/use-veegox-data";

interface UserProfileSectionProps {
  profile: UserProfile | null;
  isLoading: boolean;
}

const UserProfileSection = ({ profile, isLoading }: UserProfileSectionProps) => {
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 bg-veegox-card-bg/50 rounded-lg p-4 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-700"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center bg-veegox-card-bg rounded-lg p-6">
        <div className="text-center">
          <UserCircle className="h-12 w-12 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-400">Connectez votre wallet pour voir votre profil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-4 bg-veegox-card-bg rounded-lg p-4">
      <div className="w-16 h-16 rounded-full bg-veegox-purple/20 flex items-center justify-center">
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
        ) : (
          <UserCircle className="h-10 w-10 text-veegox-purple" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{profile.username || `Utilisateur ${formatAddress(profile.wallet_address)}`}</h3>
        <p className="text-sm text-gray-400 mb-2">{formatAddress(profile.wallet_address)}</p>
        <div className="flex items-center">
          <div className="px-2 py-1 bg-veegox-purple/20 text-veegox-purple rounded text-xs">
            Score on-chain: {profile.score_onchain || 0}
          </div>
        </div>
      </div>
      <Button size="sm" variant="outline" className="self-start">
        Éditer
      </Button>
    </div>
  );
};

export default UserProfileSection;
