import type { Doctor } from "../FindDoctor";

type Props = {
  doctors: Doctor[];
  selectedDoctorId: string | null;
  onSelectDoctor: (id: string) => void;
  isLoading?: boolean;
  error?: string;
};

export default function DoctorList({
  doctors,
  selectedDoctorId,
  onSelectDoctor,
  isLoading = false,
  error = "",
}: Props) {
  const hasDoctors = doctors.length > 0;

  return (
    <div className="card pad">
      <h2 className="fd-title">Find a Doctor</h2>
      <p className="fd-source-note">
        Source: NPI Registry. Insurance acceptance and appointment availability
        may vary.
      </p>

      <div className="fd-doctor-list">
        {isLoading && (
          <div className="fd-message-muted">Loading doctors...</div>
        )}

        {!isLoading && !!error && (
          <div className="fd-message-error">{error}</div>
        )}

        {!isLoading && !error && !hasDoctors && (
          <div className="fd-message-muted">No doctors found.</div>
        )}

        {doctors.map((doctor) => {
          const active = doctor.id === selectedDoctorId;
          const metaParts: string[] = [doctor.specialty];

          if (typeof doctor.distanceMiles === "number") {
            metaParts.push(`${doctor.distanceMiles} miles`);
          }

          if (typeof doctor.rating === "number") {
            metaParts.push(`Rating ${doctor.rating}`);
          }

          return (
            <button
              key={doctor.id}
              onClick={() => onSelectDoctor(doctor.id)}
              className={`fd-doctor-card ${active ? "is-active" : ""}`}
            >
              <div className="fd-doctor-name">{doctor.name}</div>
              <div className="fd-doctor-meta">
                {metaParts.join(" | ")}
              </div>
              <div className="fd-doctor-extra">
                Accepts: {doctor.accepts}
                {doctor.telehealth ? " | Telehealth" : ""}
                {doctor.city && doctor.state
                  ? ` | ${doctor.city}, ${doctor.state}`
                  : ""}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
