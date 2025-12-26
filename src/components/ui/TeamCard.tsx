import { TeamMember } from '@/types';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const isJuan = member.name === "Juan Ignacio Nemi";

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl hover:border-zinc-700 transition-all group">
      <div className="w-24 h-24 bg-zinc-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl border border-zinc-800 group-hover:scale-110 transition-transform overflow-hidden relative">
        {member.image ? (
          <picture>
            <source srcSet={`${member.image}?format=avif`} type="image/avif" />
            <source srcSet={`${member.image}?format=webp`} type="image/webp" />
            <img
              src={member.image}
              alt={member.name}
              className={`w-full h-full object-cover ${isJuan ? 'object-[50%_65%]' : ''}`}
              loading="lazy"
              decoding="async"
            />
          </picture>
        ) : (
          <span>{member.initials}</span>
        )}
      </div>
      <h4 className="text-xl font-bold mb-1 text-white">{member.name}</h4>
      <p className="text-purple-500 text-sm font-semibold">{member.role}</p>
    </div>
  );
}
