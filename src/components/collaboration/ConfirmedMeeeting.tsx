import React from 'react';
import { getRequestsForEntrepreneur, getRequestsFromInvestor } from '../../data/collaborationRequests';
import { useAuth } from '../../context/AuthContext';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const ConfirmedMeetings: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Entrepreneur → show requests for them
  // Investor → show requests they sent
  const requests =
    user.role === 'entrepreneur'
      ? getRequestsForEntrepreneur(user.id)
      : getRequestsFromInvestor(user.id);

  // Filter only accepted
  const confirmed = requests.filter((req) => req.status === 'accepted');

  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Confirmed Meetings</h3>
      </CardHeader>
      <CardBody>
        {confirmed.length > 0 ? (
          <ul className="space-y-3">
            {confirmed.map((req) => (
              <li
                key={req.id}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <div>
                  <p className="text-sm text-gray-800">{req.message}</p>
                  <span className="text-xs text-gray-500">
                    Scheduled {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Badge variant="success" size="sm">
                  Accepted
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No confirmed meetings yet.</p>
        )}
      </CardBody>
    </Card>
  );
};